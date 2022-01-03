var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var err = document.querySelector(".err");
fetch(usersAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(userList) {
         handleLogInForm(userList);
    });
function handleLogInForm(userList) {
    var logInBtn = document.querySelector(".login-button");
    logInBtn.onclick = function() {
        var userName = document.querySelector("#user-name").value;
        var password = document.querySelector("#password").value;
        for (const user of userList) {
            if (user.username == userName && user.password == password){
                localStorage.id = `${user.id}`;
                window.location.assign("index.html");
                return;
            } 
        }
        if(userName.length == 0 || password.length == 0) {err.innerHTML = "Username and Password are required";}
        else {err.innerHTML = "Username or Password is INCORRECT";}
    }
}