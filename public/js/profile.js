// const isAuthorized = localStorage.getItem('isAuthorized');
const btnLogout = document.querySelector(".btn");

btnLogout.onclick = function(){
    localStorage.clear();
}

const userId = localStorage.getItem('userId');

fetch(`/profile/${userId}`)
.then(async response => {

});