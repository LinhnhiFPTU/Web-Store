const buttonPlus = document.querySelectorAll("#plus")
const buttonMinus = document.querySelectorAll("#minus")
let quantities = document.querySelectorAll("#quantity")
let i=0

buttonPlus.forEach(plus => {
    plus.addEventListener('click', function() {
        i+=1;
        quantities.innerText = i;
    })
}   
)
buttonMinus.forEach(minus => {
    minus.addEventListener('click', function() {
        if(i>=1) {
            i=i-1;
            quantities.innerHTML = i;
        }
        else i=0;
    })
}
)
/*
buttonMinus.addEventListener('click', function() {
    if(i>=1) {
        i=i-1;
        quantities.innerHTML = i;
    }
}) */

let productsInCart = [

];