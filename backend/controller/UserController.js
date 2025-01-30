import userModel from '../module/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10); 
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new userModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash, 
        })
        console.log('ddd', doc)

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret333',
        )

        res.json({
            msg: 'Вы зарегистрировались',
            user,
            token,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json('Ошибка на сервере')
    }
}

export const login = async (req, res) => {
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
        return res.status(500).json('Неверный логин или пароль')
    }
    
    const password = await bcrypt.compare(req.body.password, user.passwordHash);
    if(!password){
        return res.status(500).json('Неверный логин или пароль')
    }

    const token = jwt.sign(
        {
            _id: user._id
        },
        'secret123',
        {
            expiresIn: '30d',
        }
    )
    
    res.json({
        msg: 'Вы вошли',
        user, 
        token,
    })
}

export const getMe = async (req, res) => {
    try{
        const user = await userModel.findById({_id: req.userId._id});
        const {passwordHash, ...userData} = user._doc;
        console.log(userData)
        res.json({
                msg: 'Вы вошли',
                user: userData,
            }
        );
    }
    catch(err) {
        res.status(404).json({
            msg: 'Пользователь не найден',
        })
    }
}