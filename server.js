// const express = require('express');
// const mysql = require('mysql2/promise');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const multer  = require("multer");
// const res = require('express/lib/response');

// const app = express();
// const port = 3003;

// app.use(multer({dest:"uploads"}).single("filedata"));

// app.use(bodyParser.urlencoded({extended:false}));
// // const pool = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     password: '123123123',
// //     database: 'datausers'
// // });




// app.use(express.static(__dirname + '/public'));
// app.use(express.json()); 

// app.get('/', homePage);

// // app.post('/register', register);

// var storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "uploads")
//     },
//     filename: (req, file, cb) =>{
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })


// var upload = multer({storage: storage});

// app.post('/upload', upload.single('filedata'), (req, res) => {
//     const file = req.file;
//     console.log(file);
//     if (!file) {
//         const error = new Error("Файл не загружен");
//         return next(error);
//     }
//     res.send(file)
// })


// // app.post("/upload", function (req, res, next) {
   
// //     let filedata = req.file;
// //     console.log(filedata);
// //     if(!filedata)
// //         res.send("Ошибка при загрузке файла");
// //     else
// //         res.send("Файл загружен");
// // });



// function homePage(req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// }


// async function register(req, res) {
//     const { firstname, lastname, login, password } = req.body;
//     const hash = await bcrypt.hash(password, 10);  

// 	await pool.query('insert users (firstname, lastname, login, password) values (?,?,?,?)', [firstname, lastname, login, hash]);


//     // if(users.find(u => u.login === login)) {
//     //   logAuth(`Попытка создания второго логина: ${login}`);
//     //   return res.status(400).json({message: 'Создание второго одинакового логина'});;
//     // }
//     res.status(201).json({message: 'Успешная регистрация '});;
//   }



// // const connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: '123123123',
// //     database: 'datausers'
// // });

// // const query = `SELECT * FROM users;`;
// // connection.query(query, (error, results) => {
// //   console.log(results);
// // });



// // pool.connect((err) => {
// //     if (err) {
// //     console.error('error connecting: ' + err.stack);
// //         return;
// //     }
// //     console.log('База данных подключена');
// // });


// app.listen(port, () => {
//     console.log(`Сервер запущен: http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', homePage);
function homePage(req, res) {
    res.sendFile(__dirname + '/public/index.html');
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

app.post('/upload', upload.single('filedata'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

const port = 3003;
app.listen(port, () => {
    console.log('Server is working on port ' + port);
});