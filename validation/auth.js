import {body} from 'express-validator';

export const registerValidation = [
    body('email', "неверный email").isEmail(),
    body('password', "неверный пароль").isLength({min: 5}),
    body('fullName', "неверное имя").isLength({min: 3}),
    body('avatarUrl', "неверная ссылка").optional().isURL(),
      
]