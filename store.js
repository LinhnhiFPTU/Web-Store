var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var userCart;
var logOut = document.querySelectorAll("#logOut");
fetch(usersAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(userList) {
        handlePage(userList)
    });
function handlePage(userList){
    checkLogin();
    checkLogOut()
    userList.forEach(function(user) {
        if(user.id==localStorage.id) {
           userCart = user.cart;
           start();
        }
    })
}
function start() {
    printItemCart();
    getItem();
    cartTotal();
    deleteCart();
}
function checkLogOut() {
    logOut.forEach(function(item) {
       item.addEventListener('click', function(event) {
            delete localStorage.id;
            window.location.assign("login.html");
        })
    })
}
function checkLogin() {
    if (localStorage.id==undefined) {
      window.location.assign("login.html");
    }
};
function printItemCart() {
    userCart.forEach(function(item) {
        var addtr = document.createElement("tr")
    addtr.innerHTML = `
    <tr>
        <td class="select-image"><img src="${item.image}"></td>
        <td class="select-infor">
            <p class="product-title">${item.name}</p>
        </td>
        <td class="select-price"><p class="price"><span>${item.price}</span> VND</p></td>
        <td class="select-button">
            <input class= "quantity" type="number" min="1" value="${item.quantity}">                             
        </td>
        <td class="select-delete"><img class="delete-icon" src="image/delete-icon.png"></td>
    </tr>
    `
    var cartTable = document.querySelector('tbody')
    cartTable.append(addtr)
    })
}
const carts = document.querySelectorAll('.image-item');
function addCart(productImg, productName, productPrice) {
    var addtr = document.createElement("tr")
    var trContent = productImg
    var cartTable = document.querySelector(".subbody")
    console.log(cartTable)
}
const updateAPI = async function() {
    var data= {cart: userCart}
    var update = await fetch(usersAPI+ '/' + localStorage.id,{
        method: 'PUT',
        headers:{
        'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
}
function getItem() {
    carts.forEach(function(getItem) {
        getItem.addEventListener('click', function(event) {
            var btnItem = event.target;
            var product = btnItem.parentElement;
            var productImg = product.querySelector('img').src
            var productName = product.querySelector('.details').textContent
            var productPrice = product.querySelector('.price span').innerText
            showSuccessMessage();
            addCart(productImg, productName, productPrice)
            if(userCart.length == 0) {
                var data = {
                    image: productImg,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                }
                userCart.push(data);
            }
            else {
                var check = userCart.find(function (item) {
                    return item.name == productName
                })
                if (check == undefined) {
                    var data = {
                            image: productImg,
                            name: productName,
                            price: productPrice,
                            quantity: 1
                        }
                        userCart.push(data);
                }
                else {
                    userCart.forEach(function(item) {
                    if(item.name == productName) {
                        item.quantity ++;
                    }
                })
                }
            }
            updateAPI()
        })
    })
}
function addCart(productImg, productName, productPrice) {
    var cartItem = document.querySelectorAll('tbody tr')
    for (var i=0; i<cartItem.length; i++) {
        var productT = document.querySelectorAll('.product-title')
        if(productT[i].innerHTML == productName) {
            var product = productT[i].parentElement.parentElement;
            var numbers = product.querySelector('.quantity').value
            product.querySelector('.quantity').value= numbers +1-numbers*9;
            return;
        }
    }
    var addtr = document.createElement("tr");
    addtr.innerHTML = `
    <tr>
        <td class="select-image"><img src="${productImg}"></td>
        <td class="select-infor">
            <p class="product-title">${productName}</p>
        </td>
        <td class="select-price"><p class="price"><span>${productPrice}</span> VND</p></td>
        <td class="select-button">
            <input class= "quantity" type="number" min="1" value="1">                             
        </td>
        <td class="select-delete"><img class="delete-icon" src="image/delete-icon.png"></td>
    </tr>
    `
    
    var cartTable = document.querySelector('tbody')
    cartTable.append(addtr)
    cartTotal()
    deleteCart()
}
function toast({
    message = '',
    type = 'success',
    duration = 3000
}) {
    const main = document.getElementById('alert');
    if (main) {
        const toast = document.createElement('div');
        toast.onclick = function(e) {
            if (e.target.closest('.close')) {
                main.removeChild(toast);
            }
        }
        toast.style.animation = `slideInLeft ease.3s, fadeOut linear 1s 1s forwards`;
        toast.classList.add('toast',`toast--${type}`);
        toast.innerHTML = `
        <div class="toast toast-success backgrMess">
        <span class="fas fa-check-circle"></span>
        <span class="message">${message}</span>
        <div class="close"><span class="fas fa-times"></span></div>
        </div>
        `;
        main.appendChild(toast)
        setTimeout(function() {
            main.removeChild(toast);
        }, duration +1000)
    }
}
function showSuccessMessage() {
    toast({
        message: 'Successfully added to cart',
        type: 'success',
        duration: 1000,
      });
}
/*--------------------Cart Total-------------------------*/
function cartTotal() {
    var cartItem = document.querySelectorAll('tbody tr');
    var totalB = 0;
    for (var i=0; i<cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector('input').value
        var productName = cartItem[i].querySelector('.product-title').textContent
        var productPrice = cartItem[i].querySelector('.select-price span').innerHTML
        var totalA = inputValue*productPrice*1000
        totalB = totalB + totalA
        userCart.forEach(function(item) {
            if(item.name == productName) {
                var numbers = cartItem[i].querySelector('input').value;
                item.quantity = numbers;
                updateAPI();
            }
        } )
    }
    var cartTotal = document.querySelector('.cart-total span')
    cartTotal.innerHTML = totalB.toLocaleString('de-DE');
    inputChange();
    success()
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
            var productName = deleteItem.querySelector('.product-title').innerText
            deleteItem.remove()
            cartTotal()
            var index = userCart.findIndex(function(item) {
                return item.name == productName 
            })
            userCart.splice(index,1);
            updateAPI()
        })
    }
}
function success() {
    var checkOut = document.querySelector('.checkout');
    var newCart = [];
    checkOut.addEventListener('click', function() {
        swal({
            title: "Thank You",
            text: "Your order has been successfully completed!",
            icon: "success",
            button: "OK",
          });
        var cartItem = document.querySelectorAll('tbody tr')
        cartItem.forEach(function(item) {
            item.remove();
        })
        cartTotal()
        userCart = newCart;
        updateAPI();
    })
}