const deletePost = document.querySelector('.deletePost')

const id = localStorage.getItem('userId');
const creatorPost = document.querySelector('.createUser').textContent;
document.querySelector('.createUser').style.display = 'none'
if (id == creatorPost) {
    deletePost.style.display = 'block'
} 



deletePost.onclick = async function (){
    const pathname = window.location.pathname; 
    const idUrl = pathname.split('/').pop();
    const response = await fetch('/deletePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUrl
      })
      });
  
      if (response.ok) {
        window.location.href = '/';
      } else {
        showError('Неверный пароль или логин');
      }
}