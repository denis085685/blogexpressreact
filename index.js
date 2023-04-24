import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import mytestMiddleware from "./utils/mytestMiddleware.js";
import newMiddleWareAsync from "./utils/newMiddleWareAsync.js";
import { register, login, getMe } from "./controllers/UserController.js";
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

const app = express();
app.use(express.json());
app.use(mytestMiddleware); // отрабатывает каждый раз, это мой middleware

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log(err);
  });
//59 min

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", loginValidation,login);
app.get('/auth/me', checkAuth, getMe)

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth ,postCreateValidation,PostController.create);
// app.delete('/posts', PostController.remove);
// app.patch('/posts', PostController.update);



app.get('/test', newMiddleWareAsync, (req, res)=>{
    console.log('!');
    console.log('res send!');
    res.send('')
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});
