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
/*--------------------Add to cart-------------------------*/
const carts = document.querySelectorAll('.image-item');
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
        var productPrice = product.querySelector('.price span').innerText
        addCart(productImg, productName, productPrice) 
})
})
function addCart(productImg, productName, productPrice) {
    var addtr = document.createElement("tr")
    var cartItem = document.querySelectorAll('tbody tr')
    for (var i=0; i<cartItem.length; i++) {
        var productT = document.querySelectorAll('.product-title')
        if(productT[i].innerHTML == productName) {

        }
    }
    addtr.innerHTML = `
    <tr>
        <td class="select-image"><img src="${productImg}"></td>
        <td class="select-infor">
            <p class="product-title">${productName}</p>
        </td>
        <td class="select-price"><p class="price"><span>${productPrice}</span> VND</p></td>
        <td class="select-button">
            <input type="number" min="1" value="1">                             
        </td>
        <td class="select-delete"><img class="delete-icon" src="image/delete-icon.png"></td>
        
    </tr>
    `
    var cartTable = document.querySelector('tbody')
    cartTable.append(addtr)

    cartTotal()
    deleteCart()
}
/*--------------------Total Price-------------------------*/
function cartTotal() {
    var cartItem = document.querySelectorAll('tbody tr')
    var totalB = 0
    for (var i=0; i<cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector('input').value
        var productPrice = cartItem[i].querySelector('.select-price span').innerHTML
        var totalA = inputValue*productPrice*1000
        totalB = totalB + totalA
    }
    var cartTotal = document.querySelector('.price-total span')
    cartTotal.innerHTML = totalB.toLocaleString('de-DE')
    inputChange()
}
function inputChange() {
    var cartItem = document.querySelectorAll('tbody tr')
    for (var i=0; i<cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector('input')
        inputValue.addEventListener('change', function() {
            cartTotal()
        })
    }
}
/*--------------------Delete-------------------------*/
function deleteCart() {
    var cartItem = document.querySelectorAll('tbody tr')
    for (var i=0; i<cartItem.length; i++) {
        var deleteProduct = document.querySelectorAll('.delete-icon')
        deleteProduct[i].addEventListener('click', function(event) {
            var cartDelete = event.target
            var deleteItem = cartDelete.parentElement.parentElement
            deleteItem.remove()
            cartTotal()
        })
    }
}
