const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');
const bcrypt = require('bcrypt');
const formidable = require('formidable')
const fs = require('fs');
const { log } = require('console');
const jwt = require('jsonwebtoken');



const app = express();
const port = 3003;

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123123123',
//     database: 'datausers'
// });
app.use(express.static(__dirname + '/public'));
app.use(express.json()); 
app.use(express.json({extended: true}))


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'datausers'
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 

// app.use(bodyParser.urlencoded({extended: false}));

app.use('/uploads', express.static('uploads'));
app.use('/imgpost', express.static('imgpost'));

app.set("view engine", "ejs");

const storagePost = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'imgpost')
  },
  filename: function(req, file, cb){
    cb(null, uuid() + path.extname(file.originalname))
  }
})
const imgpost = multer({storage: storagePost})

app.post('/createPost', imgpost.single('image'), async (req, res) => {
    const { title, text, originalText, userId} = await req.body;
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
      const extname = path.extname(req.file.originalname);
      const allowedExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

      if (!allowedExt.includes(extname)) {
        return res.status(400).send('Недопустимый формат файла');
      }
    } 
    if (userId == 'null') {
      return res.status(409).send('Пользователь не авторизован'); 
    }
    console.log(title, originalText, userId, imagePath);    
    
    let length;
    await pool.query('select * from dataPost where title = ?', [title]).then(result => {
      length = result[0].length;
    })
    if(length != 0){
      return res.status(409).send('Заголовок занят'); 
    }
    await pool.query('INSERT INTO dataPost (id_user, title, text, originalText, imgPost) VALUES (?, ?, ?, ?, ?)',[userId, title, text, originalText, imagePath]);
    res.status(200).send('Пользователь зарегистрирован');
})

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

    const { login, password, firstname, lastname } = await req.body;
    const hash = await bcrypt.hash(password, 10);  
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
      const extname = path.extname(req.file.originalname);
      const allowedExt = ['.jpg', '.jpeg', '.png', '.webp'];

    if (!allowedExt.includes(extname)) {
      return res.status(400).send('Недопустимый формат файла');
    }
    } 
    // console.log(login, password, firstname, lastname, req.file);
    // res.status(200).send('Пост создан');
    // console.log(login, password, firstname, lastname, req.file);

    
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
            const id = resultUser[0][0].Id
            res.status(200).json({
              ok: true,
              id: id        
            });
        } else{
            res.status(400).send('Неправильный пароль'); 
        }
      } else{
        return res.status(400).send('Пользователь не найден'); 
    }
});

app.get('/profile/:id', async(req, res) => {

  const userId = req.params.id;
  const [post] = await pool.query('SELECT * FROM dataPost WHERE id_user = ?', [userId]);
  const user = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
  if (user[0].length == 0) {
    return res.redirect('/');
  }
  let img = user[0][0].imgUsers;
  if (user[0][0].imgUsers == null) {
    img = 'uploads/null.png'
  };
  post.forEach(post => {
    if (!post.imgPost) {
      post.imgPost = 'imgpost/null.jpg';
    }
  })
  post.forEach(post => {
    post.shortText = post.originalText.match(/.{1,30}(\s|$)/g).join(' ');
    post.shortTitle = post.title.match(/.{1,30}(\s|$)/g).join(' ');
    let truncatedText = post.shortText.substring(0, 290);
    if (post.shortText.length > 290) {

      // Добавляем многоточие
      truncatedText += '...';
    
    }
    post.shortText = truncatedText; 
  });
  res.render("profile", {
    firstname: user[0][0].FirstName,
    lastname: user[0][0].LastName,
    img : img,
    posts: post
  })
});
app.get('/post/:id', async(req, res) => {

  const postId = req.params.id;
  const post = await pool.query('SELECT * FROM dataPost WHERE id = ?', [postId]);
  if (post[0].length == 0) {
    return res.redirect('/');
  }
  let img = post[0][0].imgPost
  if (post[0][0].imgPost == null) {
    img = 'imgpost/null.jpg'
  } else{
    img = img.replace(/\\/g, '/');

  }

  res.render("post", {
    createUser_id : post[0][0].id_user,
    title: post[0][0].title,
    text: post[0][0].text,
    img : img
  })
});
app.get('/', async(req, res) => {
  const [rows] = await pool.query('  SELECT * FROM dataPost ORDER BY Id DESC');
  rows.forEach(post => {
    if (!post.imgPost) {
      post.imgPost = 'imgpost/null.jpg';
    }
  })
  rows.forEach(post => {
    post.shortText = post.originalText.match(/.{1,30}(\s|$)/g).join(' ');
    post.shortTitle = post.title.match(/.{1,30}(\s|$)/g).join(' ');
    let truncatedText = post.shortText.substring(0, 290);
    if (post.shortText.length > 290) {

      // Добавляем многоточие
      truncatedText += '...';
    
    }
    post.shortText = truncatedText; 
  });
  res.render("index", {posts: rows})
})

app.get('/html/posts', async(req, res) => {
const [rows] = await pool.query('  SELECT * FROM dataPost ORDER BY Id DESC');
  // const [rows] = await pool.query('SELECT * FROM postModeration');
  rows.forEach(post => {
    if (!post.imgPost) {
      post.imgPost = 'imgpost/null.jpg';
    }
  })
  rows.forEach(post => {
    post.shortText = post.originalText.match(/.{1,30}(\s|$)/g).join(' ');
    post.shortTitle = post.title.match(/.{1,30}(\s|$)/g).join(' ');
    let truncatedText = post.shortText.substring(0, 290);
    if (post.shortText.length > 290) {

      // Добавляем многоточие
      truncatedText += '...';
    
    }
    post.shortText = truncatedText; 
  });
  res.render("posts", {posts: rows})
});

app.post('/deletePost', async(req, res) => {
  const {idUrl} = req.body;
  await pool.query(`DELETE FROM dataPost WHERE id = ${idUrl}`);
  res.status(200).send('пост удален');
})

app.post('/createFeedback', async(req, res) => {
  const {userId, firstname, email, phone, message} = req.body;
  await pool.query('INSERT INTO dataFeedback (id_user, firstname, email, phone, message) VALUES (?, ?, ?, ?, ?)',[userId, firstname, email, phone, message]);
  res.status(200).send('Форма отправлена');
})

app.use((req, res, next) => {
  res.status(404).render('404');
});
app.use((error, req, res, next) => {
  console.error(error); 
  res.status(500).render('404');
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});