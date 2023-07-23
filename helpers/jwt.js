const jwt = require('jsonwebtoken')


const generarjwt=(uid,name)=>{

return new Promise((resolver, reject)=>{

    const payload = {uid,name};
    jwt.sign(payload,process.env.SECRET_JWT,{expiresIn:'2h'},(err,token)=>{if(err){console.log(err); reject("no se pudo resolver")};resolver(token)})

})

}


module.exports = {

    generarjwt
}