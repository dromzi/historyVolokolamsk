// const isAuthorized = localStorage.getItem('isAuthorized');
const btnLogout = document.querySelector(".btn");

btnLogout.onclick = function(){
    localStorage.clear();
}

const userId = localStorage.getItem('userId');

fetch('../profile/profile.html')
  .then(res => res.text())
  .then(html => {
    document.documentElement.innerHTML = html;

    return fetch(`/profile/${userId}`);
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });


