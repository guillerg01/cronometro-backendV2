const { response } = require("express");
const {validationResult} = require('express-validator')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const {generarjwt} = require('../helpers/jwt')








const crearUsuario = async (req, res = response) => {
  console.log("crear usuarios ");
  console.log(req.body);

// desestructurar la req
  const {name,password,tiempo} = req.body


  try{ 
    
//buscar si ya existe en la bd ese user y pass
    let usuario = await Usuario.findOne({
      name,
      password})

      if(usuario){
  return res.status(400).json({
    ok:false,
    msg:' ese usuario y contrasena ya existe'
  })


      }


//sino existe guradar el usuario

     usuario = new Usuario(req.body)

     //encriptar contrasena
     const salt = bcrypt.genSaltSync()
     usuario.password = bcrypt.hashSync(password, salt)


     //terminar de guardar
    await usuario.save()

    //jwt
    const token = await generarjwt(usuario.id, usuario.name)



  
  //si se guardo madnar un ok o coger errores
  
  res.status(201).json({
    ok: true,
    uid:usuario.id,
    name:usuario.name,
    token,
    msg: "register",
    
  });}catch(error){
    console.log(error);
    res.status(500).json({

      ok:false,
      msg:'hable con el admin'
    })
  }
};



//LOGIIIINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

//repetir proceso
const loginusuario = async (req, res = response) => {
  console.log("se requiere /login");

  const {name,password}= req.body


  try{
    //ver q existe el usuario
    let usuario = await Usuario.findOne({
      name})

      if(!usuario){
  return res.status(400).json({
    ok:false,
    msg:' ese usuario no existe, cree uno'
  })
}


//confirmar password
const validpassword = bcrypt.compareSync(password,usuario.password)
if(!validpassword){

  return res.status(400).json({
    ok:false,
    msg:' password invalido'
  })

}

//jwt
const token = await generarjwt(usuario.id, usuario.name)





  res.json({
    ok: true,
    msg: "login",
    uid: usuario.id,
    name: usuario.name,
    token
    
  });

  }catch(error){
    
    console.log(error);
    res.status(500).json({

      ok:false,
      msg:'hable con el admin'
    })
  }


};






const renew = async (req, res = response) => {

const uid = req.uid
const name = req.name
try{
const token = await generarjwt(uid,name)



res.json({
  ok: true,
  msg: "renew",
  uid,
  name,
  token
});

}catch(error){
  res.status(500).json({

    ok:false,
    msg:'hable con el admin'
  })
}

};








const obtenerusuarios = (req, res = response) => {
  console.log("se requiere /obtener usuarios");
  res.json({
    ok: true,
    msg: "obtusers",
  });
};

module.exports = {
  crearUsuario,
  loginusuario,
   obtenerusuarios,
   renew
};
