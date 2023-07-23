const { Router } = require("express");
const router = Router();
const {
  crearUsuario,
  loginusuario,
  obtenerusuarios,
} = require("../controllers/auth");
const {check} =require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')



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



module.exports = router;
