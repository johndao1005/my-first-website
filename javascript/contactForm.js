//subscribe section
const email = document.getElementById('email');
const contact = document.getElementById('contactForm')
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')

contact.addEventListener('submit', function(e) {
    e.preventDefault();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        db.collection('contact').add({
            first_name: contact.firstName.value,
            last_name: contact.lastName.value,
            email: contact.email.value,
            message: contact.message.value
        });
        alert(`Thank you !!  We got your message and will try to respond as soon as possible.`);
    } else { return };
    contact.email.value = "";
    contact.message.value = "";
    contact.firstName.value = "";
    contact.lastName.value = "";
});
//try to link with local storage