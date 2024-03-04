const { Router } = require("express");
const router = Router();
const { validarjst } = require("../middlewares/validar-jwt");
const {
  getTrabajadores,
  crearTrabajador,
  actualizarTrabajador,
  eliminarTrabajador,
} = require("../controllers/trabajadores");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

router.use(validarjst);

router.get("/", getTrabajadores);

router.post("/", crearTrabajador);

router.put("/:id", actualizarTrabajador);

router.delete("/:id", eliminarTrabajador);

module.exports = router;
