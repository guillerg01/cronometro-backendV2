const { Router } = require("express");
const router = Router();
const {validarjst} = require("../middlewares/validar-jwt")
const { getEventos,
    crearEventos,
    actualizarEvento,
    eliminarEvento} = require("../controllers/events")
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')



router.use(validarjst)


router.get('/',getEventos)



router.post('/',[
check('tiempos','Los tiempos son obligados').not().isEmpty(),

validarCampos

],crearEventos)



router.put('/:id',actualizarEvento)


router.delete('/:id',eliminarEvento)




module.exports = router