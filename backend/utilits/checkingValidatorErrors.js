import { validationResult } from 'express-validator';

export default (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            msg: 'Ошибка валидации',
            err: errors.errors[0]
        })
    }

    next();
}