const signupForm = document.querySelector('#signup-form');
console.log(signupForm['signup-email'].value)

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        signupForm.querySelector('.error').innerHTML = '';
        signupForm.reset();
        location.href = '/index.html';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message
    })

})