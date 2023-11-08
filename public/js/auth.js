const btnPassword = document.querySelector('.Password .passwordbtn'); 

const inputPassword = document.querySelector('.Password input'); 

btnPassword.addEventListener('click', function() {
    const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    inputPassword.setAttribute('type', type);
    btnPassword.classList.toggle("fa-lock-open")
    btnPassword.classList.toggle("fa-lock")
});

const form = document.querySelector('form');
const errorMessage = document.querySelector('.validator'); 


form.addEventListener('submit', async event => {
    event.preventDefault();

    const login = document.querySelector('.Login input').value;
    const password = document.querySelector('.Password input').value;

    console.log(login);
    console.log(password);
    
    const response = await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password  
    })
    });

    if (response.ok) {
      const resultJson = await response.json()
      localStorage.setItem('isAuthorized', true);
      localStorage.setItem('userId', resultJson.id);
      window.location.href = '/';
    } else {
      showError('Неверный пароль или логин');
    }
});


function showError(text) {
    errorMessage.textContent = text;
    errorMessage.classList.add('show');
  
    setTimeout(() => {
      errorMessage.classList.remove('show'); 
    }, 3000);
  }