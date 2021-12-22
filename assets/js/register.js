var usersApi = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";

function start() {
  getInfor();
  handleSignUpForm();
}; 
start();   

function getInfor(callback) {
  fetch(usersApi)
      .then( function(response){
          return response.json();
      })
      .then(callback);
}

function handleSignUpForm(inforList) {
    var signupBtn = document.querySelector(".signUpBtn")
    signupBtn.onclick = function() {
      var fullName = document.getElementById("fullname").value;
      var username = document.getElementById("username").value;
      var password = document.getElementById("Password").value;
      var confirmPassword = document.getElementById("confirm").value;
      var phoneNumber = document.getElementById("phone-number").value; 
      var notify = document.getElementById("notify");
      var email = "";
      var address = "";
      var cart = [];
      var formData = {
        fullname: fullName,
        username: username,
        password: password,
        phonenumber: phoneNumber,
        email: email,
        address: address,
        cart: cart
      };

      if (!fullName || !username || !password || !confirmPassword || !phoneNumber) {
        notify.innerHTML = "Please do not leave these fields blank!";
        return;
      }
      if (confirmPassword !== password) {
        notify.innerHTML = "Confirm Password is INCORRECT"
      }
      else {
        createForm(formData);
        alert('Register Successfully');
        window.location.assign("login.html");  
      }
     
    }
  }     
  function createForm (data, callback) {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
    fetch(usersApi, options)
          .then(function(response) {
              response.json();
          })
          .then(callback);
  }

