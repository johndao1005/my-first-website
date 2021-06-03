// cart Section Start
// Get from storage
let cart = JSON.parse(localStorage.getItem('cart'))

// load cart to DOM
cart.forEach((itm, idx) => {
        // create a div element for item
        let cart = JSON.parse(localStorage.getItem('cart'))

        let rowElm = document.createElement('div')
            // adding class to div
        rowElm.classList.add('cart-row')
        rowElm.classList.add('delete')
            // creating id for that item based off the stored item name
        rowElm.id = `itemID-${itm[0]}`
            // filling div with this stuff.   setting the name price and ammount from stored cart doing it for each item
        rowElm.innerHTML = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${itm[0].replaceAll('_', " ")}</span>
        </div>
        <span class="cart-price cart-column">$${itm[1]}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" id="valID-${itm[0]}" type="number" value="${itm[2]}" min="1" onclick="updateAmmount('valID-${itm[0]}')">
            <button class="btn btn-danger" type="button" onclick="removeItem('itemID-${itm[0]}')">REMOVE</button>
        </div>
    `
            // adding current element to DOM cart list
        document.getElementById('payment-cart-list').appendChild(rowElm)

    })
    // Calculate the total price on page load
calcPrice()
    // Remove Item
function removeItem(id) {
    // converting the generated id back into the original item name
    let itemName = id.slice(7)
        // cycling through each item in the cart
    cart.forEach((arrItm, arrIdx) => {
            // if the current item is the removed item
            if (arrItm.includes(itemName)) {
                // remove current item
                cart.splice(arrIdx, 1)
                    // cart length after removing item is 0 then remove cart from storage
                if (cart.length === 0) {
                    // remove cart from storage
                    localStorage.removeItem('cart')
                } else {
                    // else update the cart in storage
                    localStorage.setItem('cart', JSON.stringify(cart))
                }

            }
        })
        // remove the input element
    document.getElementById(id).remove()
        // update price
    calcPrice()
}

function calcPrice() {
    // if nothing in cart total price is 0
    let totalPrice = 0
        // if cart exists and there is more than one itme in cart
    if (cart && cart.length > 0) {
        // cycle thought the cart
        cart.forEach(itm => {
            // add the price of each item times the amount then add to the total price counter
            totalPrice += (+itm[1] * itm[2])
        })
    }
    // update the total price element
    document.getElementById('payment-total-price').textContent = `$${totalPrice}`
}

function updateAmmount(id) {
    // select element, get name from generated id 
    let elm = document.getElementById(id)
    let name = id.slice(6)
        // cycling through each item in the cart
    cart.forEach((arrItm, arrIdx) => {
            // if current cart item is the input item
            if (arrItm.includes(name)) {
                // setting the item ammount to the value of the selected element
                cart[arrIdx][2] = +elm.value;
            }
        })
        // calulate the total price
    calcPrice()
}
// Cart Section end
// Checkout
const form = document.getElementById('checkout')

form.addEventListener('submit', e => {
    (e).preventDefault;
    currentUser = auth.currentUser;
    if (currentUser === null) {
        alert('Please login to finish the payment');
        return;
        //working in the situation where there is no item in cart
        // } else if (!cart || cart === null) {
        //     alert('Please choose at least 1 item');
        //     return;
    } else {
        document.querySelector('.delete').remove();
        localStorage.removeItem('cart');
        alert('We recieved your order. You will recieve packing slips and confirmation email shortly ')
        db.collection('subscribe').doc(currentUser.uid).collection('cart').add({ // Storing the input data to firebase with uid value 
            title: form.email.value
        })
        return;
    }
})