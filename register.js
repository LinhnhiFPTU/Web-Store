var fullName = document.getElementById("fullname").value;
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var confirmPassword = document.getElementById("confirm").value;
var phoneNumber = document.getElementById("phone-number").value;

var usersApi = "https://61b32a86af5ff70017ca1d02.mockapi.io/users"

function start() {
    //getInfor(renderInfor);

    handleCreateForm();
}; 

start();    

function getInfor(callback) {
    fetch(usersApi)
    .then(function(response) {
        return response.json(); //Json => Javascript
    })
    .then(callback);
}


/*function renderInfor(users) {
    
}*/

function handleCreateForm() {
    var signupBtn = document.querySelector(".signUpBtn")
    signupBtn.onclick = function() {
        alert('Register Successfully')
        window.location.assign("login.html");
    }
}

/*var  = document.getElementById("notify");
var testEr = "Username Or Password Is Incorrect";

if (!username || !password) {
  notify.innerHTML = "Username And Password Are Required";
  return;
} else {
  const response = await fetch(
    "https://61814ec932c9e20017804764.mockapi.io/users?username=" +
      username +
      "&password=" +
      password
  );
  const users = await response.json();

  try {
    if (users[0].password !== password) {
      notify.innerHTML = `${testEr}`;
      return;
    } else {
      testEr = 0;
      window.localStorage.setItem("UAT", users[0].token);
      window.location.assign("index.html");
    }
  } catch (err) {
    notify.innerHTML = `${testEr}`;
  }
}



*/