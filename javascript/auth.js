const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');


let currentUser = null;
let newTitle = '';
let updateId = null;

// NOTE user display will update depends on the account and db 
function setupUI(user) {
    if (user) {
        loginItems.forEach(item => item.style.display = 'block');
        logoutItems.forEach(item => item.style.display = 'none');

    } else {
        loginItems.forEach(item => item.style.display = 'none');
        logoutItems.forEach(item => item.style.display = 'block');
    }
}

function renderList(doc) {

    let li = document.createElement('li');
    li.className = "collection-item";
    li.setAttribute('data-id', doc.id);

    let div = document.createElement('div');
    let title = document.createElement('span');
    title.textContent = doc.data().title;

    let anchor = document.createElement('a');
    anchor.href = "#modal-edit";
    anchor.className = "modal-trigger secondary-content";

    let editBtn = document.createElement('i');
    editBtn.className = "material-icons";
    editBtn.innerText = "edit";

    let deleteBtn = document.createElement('i');

    deleteBtn.className = "material-icons secondary-content";
    deleteBtn.innerText = "delete";
    anchor.appendChild(editBtn);
    div.appendChild(title);
    div.appendChild(deleteBtn);
    div.appendChild(anchor);
    li.appendChild(div);

    // Event listeners for the delete icon
    deleteBtn.addEventListener('click', e => {
            let id = e.target.parentElement.parentElement.getAttribute('data-id'); // targeting the document data by it's id 
            db.collection('alltodos').doc(currentUser.uid).collection('todos').doc(id).delete(); // calling the delete method by the database functions and removing from the db.
        })
        // Event listener for the edit icon
    editBtn.addEventListener('click', e => {
        updateId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    })

    todoList.append(li);


}
auth.onAuthStateChanged(user => {
    setupUI(user);
    currentUser = auth.currentUser;

    document.querySelector('#user-email').innerHTML = (currentUser != null ? currentUser.email : '');

    console.log('currentUser', currentUser)
        // if (currentUser === null) {
        //     todoList.innerHTML = '<h3 class="center-align">Please login to get todos</h3>';
        //     return;
        // }
})

//ANCHOR logging out using firebase method signOut  
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut();
    location.href = '/index.html';
})

const loginForm = document.querySelector('#login-form');
console.log(loginForm['login-email'].value)

//  ANCHOR Setup the login  page with db and catching errors
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(() => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.querySelector('.error').innerHTML = '';
        loginForm.reset();
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message
    })

})