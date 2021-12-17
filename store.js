/*--------------------User-------------------------*/
var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var logOut = document.querySelector("#logOut");
fetch(usersAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(userList) {
        handleStore(userList);
    });
function handleStore(userList) {
    checkLogin();
    logOut.onclick = function() {
        delete localStorage.id;
        window.location.assign("login.html");
    };
    handleProfile(userList);
}
function checkLogin() {
  if (!window.localStorage.id) {
    window.location.assign("login.html");
  }
};
function activeBtn() {
    document.querySelector(".save").disabled = false;
    document.querySelector(".save").style.background = 'rgba(32, 145, 30, 1)';
};
function handleProfile(userList) {
    document.querySelector(".save").disabled = true;
    document.querySelector(".save").style.background = 'rgba(32, 145, 30, 0.5)';
    // document.querySelector(".changePassBtn").disabled = true;
    // document.querySelector(".changePassBtn").style.background = 'rgba(32, 145, 30, 0.5)';
    var name = document.querySelector("#name");
    var phone = document.querySelector("#phone");
    var address = document.querySelector("#address");
    var email = document.querySelector("#email");
    for (const user of userList) {
        if (user.id == localStorage.id){
            name.value = `${user.fullname}`;
            phone.value = `${user.phonenumber}`;
            if(address.value != undefined) address.value = `${user.address}`;
            if(email.value != undefined) email.value = `${user.email}`;
        }
    }
} 
function updataProfile(){
    var name = document.querySelector("#name").value;
    var phone = document.querySelector("#phone").value;
    var address = document.querySelector("#address").value;
    var email = document.querySelector("#email").value;
    var data = {
        fullname: name,
        phonenumber: phone,
        address: address,
        email: email
    };
    fetch(usersAPI+ '/' + localStorage.id,{
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        return response.json()
    })
    .then(data=> 
        alert("Successfully updated!"))
}
function changePass() {
    var nowPass = document.querySelector("#pass-now").value;
    var newPass = document.querySelector("#pass-new").value;
    var confirmNewPass = document.querySelector("#confirm").value;
    var err = document.querySelector(".errNote");
    fetch(usersAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(userList) {
        for (const user of userList) {
            if (user.id == localStorage.id){
                if(user.password != nowPass)  err.innerHTML = "Your old password is INCORRECT";
                else if (user.password == newPass) err.innerHTML = "New password cannot like old password";
                else if (newPass != confirmNewPass) err.innerHTML = "Confirm password is INCORRECT";
            }
        }
    });
}
/*------------Add to cart -------*/   
const carts = document.querySelectorAll('.image-item .add');
console.log(carts)
carts.forEach(function(button, index) {
    button.addEventListener('click', function(event) {
        var btnItem = event.target;
        var product = btnItem.parentElement;
        var productImg = document.querySelector('.image').src
        var productName = document.querySelector('.details')
        console.log(productImg)  
})
})
