const { response } = require("express");
const Paquete = require("../models/Paquete");

const getPaquetes = async (req, res = response) => {
  let query = {};
  if (req.params.id) {
    query.user = req.params.id;
  }
  const paquetes = await Paquete.find(query);
  console.log(paquetes);

  res.json({
    ok: true,
    paquetes,
  });
};

const crearPaquete = async (req, res = response) => {
  console.log(req.body);
  const paquete = new Paquete(req.body);

  try {
    paquete.user = req.uid;
    const paqueteGuardado = await paquete.save();

    res.status(201).json({
      ok: true,
      paqueteGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarPaquete = async (req, res = response) => {
  const paqueteId = req.params.id;
  const { uid } = req.uid;
  const { paquete, nombre, peso, direccionA, direccionB, estado } = req.body;
  try {
    const paqueteActual = await Paquete.findById(paqueteId);
    if (!paqueteActual) {
      res.status(404).json({
        ok: false,
        msg: "Paquete no existe",
      });
    }

    const nuevoPaquete = {
      paquete,
      nombre,
      peso,
      direccionA,
      direccionB,
      estado,
    };
    const paqueteActualizado = await Paquete.findByIdAndUpdate(
      paqueteId,
      nuevoPaquete
    );

    res.json({
      ok: true,
      msg: "actualizarPaquete",
      paquete: paqueteActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarPaquete = async (req, res = response) => {
  const paqueteId = req.params.id;
  const { uid } = req.uid;

  try {
    const paquete = await Paquete.findById(paqueteId);
    if (!paquete) {
      res.status(404).json({
        ok: false,
        msg: "Paquete no existe",
      });
    }

    const paqueteEliminado = await Paquete.findByIdAndDelete(paqueteId);

    res.json({
      ok: true,
      msg: "eliminarPaquete",
      paquete: paqueteEliminado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getPaquetes,
  crearPaquete,
  actualizarPaquete,
  eliminarPaquete,
};
