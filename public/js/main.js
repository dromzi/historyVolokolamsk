const isAuthorized = localStorage.getItem('isAuthorized');
const btnProfileAuth = document.querySelector('.header-login');
if (isAuthorized == 'true') {
    btnProfileAuth.innerHTML = `<a href="./profile/profile.html" class="btn">Профиль</a>`; 
} 