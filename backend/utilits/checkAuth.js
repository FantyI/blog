import jwt from 'jsonwebtoken';
import userModule from '../module/User.js';

export const authMe = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    console.log(req.headers.authorization)
    if (token) {
        try {
            const _id = jwt.verify(token, 'secret123');
            req.userId = _id;
            next();
        }
        catch (err) {
            res.status(403).json({
                msg: 'Нет доступа'
            })
        }
    } else {
        res.status(403).json({
            msg: 'Нет доступа'
        })
    }
} 