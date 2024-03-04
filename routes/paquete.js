const { Router } = require("express");
const router = Router();
const { validarjst } = require("../middlewares/validar-jwt");
const {
  getPaquetes,
  crearPaquete,
  actualizarPaquete,
  eliminarPaquete,
} = require("../controllers/paquetes");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

router.use(validarjst);
router.get("/", getPaquetes);
router.get("/:id", getPaquetes);

router.post(
  "/",

  crearPaquete
);

router.put("/:id", actualizarPaquete);

router.delete("/:id", eliminarPaquete);

module.exports = router;
