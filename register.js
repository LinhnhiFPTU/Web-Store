var usersApi = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var userList = [];

function start() {
  handleSignUpForm();
}; 

start();    

function createForm (data) {
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
  fetch(usersApi, options)
  .then(function(response) {
      return response.json();
  })
  .then(function(users) {
       userList = userList.concat(users);
       handleSignUpForm(userList);
  });
}

function handleSignUpForm(inforList) {
    var signupBtn = document.querySelector(".signUpBtn")
    signupBtn.onclick = function() {
      var fullName = document.getElementById("fullname").value;
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirm").value;
      var phoneNumber = document.getElementById("phone-number").value; 
      var notify = document.getElementById("notify");
      var email = "";
      var address = "";
      if (!fullName || !username || !password || !confirmPassword || !phoneNumber) {
        notify.innerHTML = "Please do not leave these fields blank!";
        return;
      }
      if (confirmPassword !== password) {
        notify.innerHTML = "Confirm Password is INCORRECT"
      }
      else {
        alert('Register Successfully');
        window.location.assign("login.html");  
      }
      
    }
  }      

