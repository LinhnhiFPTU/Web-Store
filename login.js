var inputUsername = document.getElementById('user-name');
var inputPassword = document.getElementById('password');

var formLogin = document.getElementById('login');

function onFormSubmit(e) {
    var username = inputUsername.value;
    var password = inputPassword.value;
}

if (formLogin.attachEvent) {
    formLogin.attachEvent('submit', onFormSubmit);
}
else {
    formLogin.addEventListener('submit', onFormSubmit)
}