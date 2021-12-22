var carts = document.querySelectorAll('.image-item');
getItem()
function getItem() {
    carts.forEach(function(getItem) {
        getItem.addEventListener('click', function(event) {
            var btnItem = event.target;
            var product = btnItem.parentElement;
            var productImg = product.querySelector('img').src
            var productName = product.querySelector('.details').textContent
            var productPrice = product.querySelector('.price span').innerText
            toast({
                message: 'Successfully added to cart',
                    type: 'success',
                    duration: 1000
            })
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