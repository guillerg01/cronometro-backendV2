const { Router } = require("express");
const router = Router();
const {
  crearUsuario,
  loginusuario,
  obtenerusuarios,
  renew
} = require("../controllers/auth");
const {check} =require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {validarjst} = require('../middlewares/validar-jwt')


router.post(
    "/new",
    [
 check('name','nombre obligatorio').not().isEmpty(),
 check('password','password obligatorio').not().isEmpty(),
 check('password','password de 3 caracteres minimo' ).isLength({min:3}),
 validarCampos

    ],
     crearUsuario);

router.post("/", loginusuario);

router.get("/tiempo", obtenerusuarios);

router.get("/renew", validarjst ,renew);


module.exports = router;
