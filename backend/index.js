import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'

//mongodb+srv://user:098123@gleb.alnt7.mongodb.net/blog?retryWrites=true&w=majority&appName=gleb

// import { register, login, getMe } from './controller/UserController.js'; так или как снизу
import * as UserController from './controller/UserController.js'
import * as PostController from './controller/PostController.js'
import { authMe } from './utilits/checkAuth.js';
import { registerValidetion, loginValidetion, postCreateValidation, postUpdateValidation } from './validations.js'
import CheckingValidatorErrors from './utilits/checkingValidatorErrors.js';

mongoose
    .connect('mongodb+srv://user:098123@gleb.alnt7.mongodb.net/blog?retryWrites=true&w=majority&appName=gleb')
    .then(() => console.log('start DB'))
    .catch((err) => console.log(err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('hi')
})

app.post('/auth/register', registerValidetion, CheckingValidatorErrors,  UserController.register)
app.post('/auth/login', loginValidetion, CheckingValidatorErrors, UserController.login)
app.get('/auth/me', authMe, UserController.getMe)

app.post('/upload', authMe, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.post('/posts', authMe, postCreateValidation, CheckingValidatorErrors, PostController.create)//создать статью
app.patch('/posts/:id', authMe, postUpdateValidation, CheckingValidatorErrors, PostController.updete)//изменить статью
app.delete('/posts/:id', authMe, PostController.remove) //удалить статью
app.get('/posts/:id', PostController.get)//найти 1 статью 
app.get('/posts', PostController.getAll)// найти все статьи
app.get('posts/popular', PostController.getPopular)

app.listen(4444, (err) => {
    if (err) {
        return err;
    }

    console.log('start server')
}) 