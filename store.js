/*--------------------User-------------------------*/
var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var logOut = document.querySelector("#logOut");
var saveBtn = document.querySelector(".save");
fetch(usersAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(productList) {
        handleStore(productList);
    });
function handleStore(productList) {
    checkLogin();
    logOut.onclick = function() {
        delete localStorage.id;
        window.location.assign("login.html");
    };
    handleProfile(productList);
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
function handleProfile(productList) {
    document.querySelector(".save").disabled = true;
    document.querySelector(".save").style.background = 'rgba(32, 145, 30, 0.5)';
    var name = document.querySelector("#name");
    var phone = document.querySelector("#phone");
    var address = document.querySelector("#address");
    var email = document.querySelector("#email");
    for (const user of productList) {
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

/*--------------------Add to cart-------------------------*/
/*var productsApi = 'https://61b32a86af5ff70017ca1d02.mockapi.io/products'

fetch(productsApi)
    .then(response =>
        response.json()
    )
    .then(data => console.log(data)) 

const myJson = response.json(); 
products = myJson; */

const carts = document.querySelectorAll('.image-item .add');
console.log(carts)
carts.forEach(function(button, index) {
    button.addEventListener('click', function(event) {
        var btnItem = event.target;
        var product = btnItem.parentElement;
        var productImg = document.querySelector('.image').srcc
        var productName = document.querySelector('.details')
        console.log(productImg)  
})
})
/*
for (i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', function(event) {
        var btnItem = event.target;
        var product = btnItem.parentElement;
        var productImg = document.querySelector('.image')
        var productName = document.querySelector('.details')
        console.log(productName)
    })
} */


/*

function cartNumbers(product) {
    console.log('the product clicked is', product)
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    }
    else {
        localStorage.setItem('cartNumbers', 1);
    }
    
} */


/*var userName = document.querySelector("#user-name").value;
var password = document.querySelector("#password").value;*/