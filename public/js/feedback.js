const form = document.querySelector('form');

form.addEventListener('submit', async event => {
    event.preventDefault();
    const firstname = document.querySelector('.firstname_feedback').value;
    const email = document.querySelector('.email_feedback').value;
    const phone = document.querySelector('.phone_feedback').value;
    const message = document.querySelector('.message_feedback').value;
    const userId = localStorage.getItem('userId');
    console.log(firstname, email, phone, message, userId);
    
    const response = await fetch('/createFeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        firstname,
        email,
        phone,
        message
    })
    });

    if (response.ok) {
        form.innerHTML = "Форма отправлена"
    } else {
        form.innerHTML = "Ошибка"
    }
});