const isAuthorized = localStorage.getItem('isAuthorized');
const userId = localStorage.getItem('userId');
const btnProfileAuth = document.querySelector('.header-login');
const btnMobileProfileAuth = document.querySelector('.mobile-login')
if (isAuthorized == 'true') {
    if (window.location.pathname == "/html/gallery.html") {
        btnProfileAuth.innerHTML = `<a href="../profile/${userId}" class="btn">Профиль</a>`; 
        btnMobileProfileAuth.innerHTML = `<a href="../profile/${userId}" class="btn">Профиль</a>`; 
    } else{
        btnProfileAuth.innerHTML = `<a href="./profile/${userId}" class="btn">Профиль</a>`; 
        btnMobileProfileAuth.innerHTML = `<a href="./profile/${userId}" class="btn">Профиль</a>`; 
    }

} 
