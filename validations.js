import {body} from 'express-validator';

export const registerValidation = [
    body('email', "неверный email").isEmail(),
    body('password', "неверный пароль").isLength({min: 5}),
    body('fullName', "неверное имя").isLength({min: 3}),
    body('avatarUrl', "неверная ссылка").optional().isURL(),
]

export const loginValidation = [
    body('email', "неверный email").isEmail(),
    body('password', "неверный пароль").isLength({min: 5})
]

export const postCreateValidation = [
    body('title', "Введите заголовок статьи").isLength({min: 5}).isString(),
    body('test', "Введите текст статьи").isLength({min: 5}).isString(),
    body('tags', "Неверный формат тэгов(нужен массив)").optional().isString(),
    body('imageUrl', "неверная ссылка на изображение").optional().isString(),
]