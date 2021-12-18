const carts = document.querySelectorAll(".image-item");
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

