export default (req, res, next)=>{
    console.log('middle ware');
    next()
}