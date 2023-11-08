const btnLogout = document.querySelector(".btn");

btnLogout.onclick = function(){
    localStorage.clear();
}

const userId = localStorage.getItem('userId');
