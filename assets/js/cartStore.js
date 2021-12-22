var usersAPI = "https://61b32a86af5ff70017ca1d02.mockapi.io/users";
var cartIcon = document.querySelectorAll(".cart-icon");
var userCart;
fetch(usersAPI+'/'+localStorage.id)
    .then(function(response) {
      return response.json();
    })
    .then(function(user) {
      userCart = user.cart;
    });
cartIcon.forEach(function(item) {
  item.addEventListener('click', function(event) {
    clearCart();
    printItemCart();
    cartTotal();
    inputChange();
    deleteCart();
  })
})   
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
      var productPrice = cartItem[i].querySelector('.select-price span').innerHTML
      var productName = cartItem[i].querySelector('.product-title').textContent
      var totalA = inputValue*productPrice*1000
      totalB = totalB + totalA
      userCart.forEach(function(item) {
        if(item.name == productName) {
            var numbers = cartItem[i].querySelector('input').value;
            item.quantity = numbers;
        }
      } )
  }
  updateAPI();
  var cartTotal = document.querySelector('.cart-total span')
  cartTotal.innerHTML = totalB.toLocaleString('de-DE');
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
function clearCart() {
  var cartItem = document.querySelectorAll('tbody tr')
      cartItem.forEach(function(item) {
          item.remove();
      })
}