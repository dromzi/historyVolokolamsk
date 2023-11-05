const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');


const app = express();
const port = 3003;
app.use(express.static(__dirname + '/public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123123',
    database: 'datausers'
});
const query = `SELECT * FROM users;`;
connection.query(query, (error, results) => {
  console.log(results);
});

app.get('/', homePage);
function homePage(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  }


connection.connect((err) => {
    if (err) {
    console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('База данных подключена');
});


app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});
  