const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');
const bcrypt = require('bcrypt');
const { log } = require('console');

const app = express();
const port = 3003;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123123',
    database: 'datausers'
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json()); 
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, uuid() + path.extname(file.originalname))
    }
});

const upload = multer({ storage });

app.post('/register', upload.single('image'), async (req, res) => {

    const { login, password, firstname, lastname } = req.body;
    const hash = await bcrypt.hash(password, 10);  
    let imagePath;

    if (req.file) {
      imagePath = req.file.path;
    } 

	let length;
	await pool.query('select * from users where login = ?', [login]).then(result => {
		length = result[0].length;
	})

	if(length != 0)
		return res.status(409).send('Пользователь уже существует'); 

    await pool.query('INSERT INTO users (firstname, lastname, login, password, imgUsers) VALUES (?, ?, ?, ?, ?)',[firstname, lastname, login, hash, imagePath]);
    res.status(200).send('Пользователь зарегистрирован');

});

app.post('/auth', async (req, res) => {
    const {login, password} = req.body;
  
    const resultUser = await pool.query('select * from users where login = ?', [login]);

    if (resultUser[0][0]) {
        const userPassword = resultUser[0][0].password
        const validPassword = await bcrypt.compare(password, userPassword);
        if (validPassword) {
            res.status(200).send('Пользователь авторизирован');
        } else{
            res.status(400).send('Неправильный пароль'); 
        }
      } else{
        return res.status(400).send('Пользователь не найден'); 
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});