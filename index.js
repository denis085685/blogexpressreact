import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { registerValidation } from './validation/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>{
    console.log('db ok');
}).catch((err)=>{
    console.log(
        err
    );
})
//59 min

app.post('/auth/register', registerValidation, async (req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })
        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d'
        })

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Ошибка"
        })
    }

})

app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }

    console.log('server ok');
})