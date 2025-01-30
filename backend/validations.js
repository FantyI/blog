import { body } from 'express-validator';

export const registerValidetion = [
    body('email', 'Неверно указана почта').isEmail(),
    body('password', 'В пароле должно быть минимум 5 символов').isLength({min: 5}),
    body('fullName', 'В имени болжно быть минимум 3 символа').isLength({min: 3}),
    body('avatarUrl', 'Некоректная URL').optional().isURL(),
];

export const loginValidetion = [
    body('email', 'Неверно указана почта').isEmail(),
    body('password', 'В пароле должно быть минимум 5 символов').isLength({min: 5}),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок. Минимум 3 символа').isLength({min: 3}).isString(),
    body('text', 'Введите текст.').isLength({min: 1}).isString(),
    body('tag', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('imageUrl', 'Некоректная URL').optional(),
]

export const postUpdateValidation = [
    body('title', 'Введите заголовок. Минимум 3 символа').optional().isLength({min: 3}).isString(),
    body('text', 'Введите текст.').isLength({min: 1}).optional().isString(),
    body('tag', 'Неверный формат тэгов (укажите массив)').optional(),
    body('imageUrl', 'Некоректная URL').optional(),
]