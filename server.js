const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();
const port = 3003;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123123',
    database: 'datausers'
});


app.use(express.static(__dirname + '/public'));
app.use(express.json()); 

app.get('/', homePage);

app.post('/register', register);


function homePage(req, res) {
    res.sendFile(__dirname + '/public/index.html');
}


async function register(req, res) {
    const { firstname, lastname, login, password } = req.body;
    const hash = await bcrypt.hash(password, 10);  

	await pool.query('insert users (firstname, lastname, login, password) values (?,?,?,?)', [firstname, lastname, login, hash]);


    // if(users.find(u => u.login === login)) {
    //   logAuth(`Попытка создания второго логина: ${login}`);
    //   return res.status(400).json({message: 'Создание второго одинакового логина'});;
    // }
    res.status(201).json({message: 'Успешная регистрация '});;
  }



// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123123123',
//     database: 'datausers'
// });

// const query = `SELECT * FROM users;`;
// connection.query(query, (error, results) => {
//   console.log(results);
// });



// pool.connect((err) => {
//     if (err) {
//     console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('База данных подключена');
// });


app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});
  