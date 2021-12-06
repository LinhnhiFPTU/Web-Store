const menuSlide = () => {
    const menu = document.querySelector('.menu')
    const nav = document.querySelector('.product-name')
    menu.addEventListener('click', () => {
        nav.classList.toggle('menu-active')
    })
}
menuSlide();