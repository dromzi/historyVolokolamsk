const firstname = 'Артём'
const lastname = 'Кузьмин'
const login = 'dromzi89'
const password = 'dromzi89'
const passwordConfirm = 'dromzi89'

if (firstname.length <= 1 || lastname.length <= 1 || login.length <= 5) {
    showError('Имя,Фамилия,Логин должны быть более 5 символов');
    return;
}
  
if (password.length < 6) {
    showError('Пароль должен быть не менее 6 символов');
    return;
}
  
if (password !== passwordConfirm) {
    showError('Пароли не совпадают');
    return; 
}

return console.log("Пользователь зарегистрирован");

function showError(text) {
    console.log(text);
}