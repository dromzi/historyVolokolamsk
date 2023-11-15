const btnLogout = document.querySelector(".btn");

btnLogout.onclick = function(){
    localStorage.clear();
}
const pathname = window.location.pathname; 

const idUrl = pathname.split('/').pop();

    
const userId = localStorage.getItem('userId');
const btnProfileAuth = document.querySelector('.header-login');
const btnMobileProfileAuth = document.querySelector('.mobile-login')
const h1_text = document.querySelector('.h1_text')

if (idUrl != userId) {
    h1_text.innerHTML = 'Его посты';
    btnProfileAuth.innerHTML = `<a href="./${userId}" class="btn" style="background: #1e9144">Профиль</a>`; 
    btnMobileProfileAuth.innerHTML = `<a href="./${userId}" class="btn" style="background: #1e9144">Профиль</a>`; 
}