const { Router } = require("express");
const router = Router();
const { validarjst } = require("../middlewares/validar-jwt");
const {
  getEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  loginEmpleado,
} = require("../controllers/empleados");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

router.post("/login", loginEmpleado);
router.use(validarjst);

router.get("/", getEmpleados);

router.post("/", crearEmpleado);

router.put("/:id", actualizarEmpleado);

router.delete("/:id", eliminarEmpleado);

module.exports = router;
