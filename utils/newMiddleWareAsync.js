export default async (req, res, next)=>{
    let a = await test();
    console.log(a);
    next()
}

function test(){
    return new Promise((res, rej)=>{
        setTimeout(() => {
            res('promise resolved')
        }, 3000);
    })
}