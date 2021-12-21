var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var logOut = document.querySelectorAll("#logOut");
var updateInfor = document.querySelector("#updateProfile");
var passChange = document.querySelector("#changePassword");
var cartIcon = document.querySelectorAll(".cart-icon");
var userCart;
fetch(usersAPI)
    .then(function(response) {
        return response.json();
    })
    .then(function(userList) {
        handleStore(userList);
    });
function handleStore(userList) {
    handleProfile(userList);
    checkLogin();
    checkLogOut();
    checkOpenCart(userList);
}
function checkOpenCart(userList) {
    userList.forEach(function(user) {
        if(user.id==localStorage.id) {
           userCart = user.cart;
        }
    })
    cartIcon.forEach(function(item) {
        item.addEventListener('click', function(event) {
            printItemCart();
            cartTotal();
            deleteCart();
         })
     })
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
updateInfor.addEventListener('click', function(event) {
    document.querySelector(".change-pass").style.display ="none";
    document.querySelector(".edit").style.display = "flex";
})
passChange.addEventListener('click', function(event) {
    document.querySelector(".change-pass").style.display = "flex";
    document.querySelector(".edit").style.display = "none";
})
function updateProfile(){
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
    if(nowPass.length == 0 || newPass.length == 0 || confirmNewPass.length == 0) {
        err.innerHTML = "You need to fill in all the boxes";
        return;
    }
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
                else {
                    updatePassword(newPass);
                }
            }
        }
    });
}
function updatePassword(newPass) {
    var data= {password: newPass}
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
        alert("Successfully change your password!"))
}
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
    success();
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