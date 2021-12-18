<<<<<<< HEAD
const carts = document.querySelectorAll(".image-item");
=======
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
const carts = document.querySelectorAll('.image-item');
>>>>>>> 0613a784950fd806c6583c72f7ab5c8f9f0839cc
console.log(carts)
function addCart(productImg, productName, productPrice) {
    var addtr = document.createElement("tr")
    // console.log(addtr)
    var trContent = productImg
    var cartTable = document.querySelector(".subbody")
    console.log(cartTable)
}
carts.forEach(function(getItem, index) {
    getItem.addEventListener('click', function(event) {
        var btnItem = event.target;
        var product = btnItem.parentElement;
        var productImg = product.querySelector('img').src
        var productName = product.querySelector('.details').innerText
        var productPrice = product.querySelector('.price').innerText
        addCart(productImg, productName, productPrice) 
})
})

<<<<<<< HEAD
=======
function addCart(productImg, productName, productPrice) {
    var addtr = document.createElement("tr")
    addtr.innerHTML = `
    <tr>
        <td class="select-image"><img src="${productImg}"></td>
        <td class="select-infor">
            <p>${productName}</p>
        </td>
        <td class="select-price"><p>${productPrice}</p></td>
        <td class="select-button">
            <input type="number" min="1">                             
        </td>
        <td class="select-delete"><a href=""><img class="delete-icon" src="image/delete-icon.png"></a></td>
        <td class="select-total"><p>390.000VND</p></td>
    </tr>
    `
    var cartTable = document.querySelector('tbody')
    cartTable.append(addtr)

    cartTotal()
}
function cartTotal() {
    var cartItem = document.querySelectorAll('tbody tr')
    for (var i=0; i<cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector('input').value
        console.log(inputValue)
        var productPrice = cartItem[i].querySelector('.select-price p').innerHTML
        console.log(productPrice)
        var productTotal = product.querySelector('.price').innerText
        productTotal = inputValue*productPrice    
    }
}
>>>>>>> 0613a784950fd806c6583c72f7ab5c8f9f0839cc
