const isAuthorized = localStorage.getItem('isAuthorized');
const userId = localStorage.getItem('userId');
console.log(userId);
const btnProfileAuth = document.querySelector('.header-login');
if (isAuthorized == 'true') {
    btnProfileAuth.innerHTML = `<a href="./profile/${userId}" class="btn">Профиль</a>`; 
} 