const { Router } = require("express");
const router = Router();
const {validarjst} = require("../middlewares/validar-jwt")
const {   getTiempos,
    crearTiempos,
    actualizarTiempos,
     eliminarTiempo} = require("../controllers/tiempos")
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')



router.use(validarjst)


router.get('/:id',getTiempos)



router.post('/',[
check('tiempos','Los tiempos son obligados').not().isEmpty(),

validarCampos

],crearTiempos)



router.put('/:id',actualizarTiempos)


router.delete('/:id',eliminarTiempo)




module.exports = router