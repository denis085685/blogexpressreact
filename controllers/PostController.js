import PostModel from "../models/Post.js";
import { validationResult } from "express-validator";

export const create = async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imgUrl,
            tags: req.body.tags,
            user: req.userId,
        })
        
        const post = await doc.save();

        res.json({post});
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Не получилось создать пост",
        });
    }
}

export const getAll = async (req, res) =>{
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Не удалось получить посты",
        });
    }
}

export const getOne = async (req, res) =>{
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id: postId,
        },
        {
            $inc: {viewsCount: 1}
        },
        {
            returnDocument: 'after' //01:42:00
        }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Не удалось получить пост",
        });
    }
}

