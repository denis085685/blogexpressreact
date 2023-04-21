import jwt from 'jsonwebtoken';

export default (req, res, next)=>{
    console.log('start checkauth middleware');
    const token =  (req.headers.authorization || '').replace(/Bearer\s?/, '');
    // console.log(token);
    // console.log(req.headers);

    if(token){
        try{
            const decoded = jwt.verify(token, 'secret123');
            req.userId = decoded._id;
            next();
        }catch(e){
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    }else{
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }
}