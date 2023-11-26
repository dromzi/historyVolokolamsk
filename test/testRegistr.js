function regTest(firstname,lastname,login,password,passwordConfirm) {

    if (login.length <= 5) {
        console.log("\x1b[31m", 'false');
        console.log('Логин должны быть более 5 символов');
        return;
    }
    
    if (firstname.length <= 1 || lastname.length <= 1) {
        console.log("\x1b[31m", 'false');
        console.log("Имя, Фамилия должны быть больше одного символа");
        return;
    }
    
    if (password.length < 6) {
        console.log("\x1b[31m", 'false');
        console.log('Пароль должен быть не менее 6 символов');
        return;
    }
    
    if (password !== passwordConfirm) {
        console.log("\x1b[31m", 'false');
        console.log('Пароли не совпадают');
        return; 
    }
  
    console.log("\x1b[32m", 'true');
    console.log("Пользователь зарегистрирован");
  }
  
  regTest("Артём", "Кузьмин", "dromzi89", "makaka123-", "makaka123-")