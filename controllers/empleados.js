const Empleado = require("../models/Empleado");
const bcrypt = require("bcryptjs");
const { generarjwt } = require("../helpers/jwt");

const getEmpleados = async (req, res = response) => {
  const empleados = await Empleado.find();
  res.json({
    ok: true,
    empleados,
  });
};

const loginEmpleado = async (req, res) => {
  const { name, password } = req.body;
  try {
    const empleado = await Empleado.findOne({ name });
    if (!empleado) {
      return res.status(404).json({
        ok: false,
        msg: "Empleado no existe",
      });
    }
    const isMatch = await bcrypt.compare(password, empleado.password); // Asumiendo que tienes un campo 'password' en tu modelo
    if (!isMatch) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }
    const token = await generarjwt(empleado.id, empleado.name);

    // Aquí puedes manejar la creación de la sesión o token de autenticación
    res.json({
      ok: true,
      msg: "Inicio de sesión exitoso",
      empleado,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// Función para crear un nuevo empleado
const crearEmpleado = async (req, res) => {
  const {
    ci,
    nombre,
    apellido,
    telefono,
    foto,
    ocupacion,
    descripcion,
    direccion,
    rol,
    name,
    password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña
    const nuevoEmpleado = new Empleado({
      ci,
      nombre,
      apellido,
      telefono,
      foto,
      name,
      ocupacion,
      descripcion,
      direccion,
      rol,
      password: hashedPassword, // Almacenamos la contraseña hasheada
    });
    const empleadoGuardado = await nuevoEmpleado.save();
    res.json({
      ok: true,
      msg: "Empleado creado",
      empleado: empleadoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEmpleado = async (req, res = response) => {
  const empleadoId = req.params.id;
  const { uid } = req.uid;
  const {
    nombre,
    ci,
    direccion,
    name,
    docente,
    categoriaDocente,
    categoriaCientifica,
    escolaridad,
    ocupacion,
    user,
  } = req.body;
  try {
    const empleado = await Empleado.findById(empleadoId);
    if (!empleado) {
      return res.status(404).json({
        ok: false,
        msg: "Empleado no existe",
      });
    }
    const nuevoEmpleado = {
      nombre,
      ci,
      direccion,
      docente,
      name,
      categoriaDocente,
      categoriaCientifica,
      escolaridad,
      ocupacion,
      user,
    };
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      empleadoId,
      nuevoEmpleado,
      { new: true }
    );
    res.json({
      ok: true,
      msg: "Empleado actualizado",
      empleado: empleadoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEmpleado = async (req, res = response) => {
  const empleadoId = req.params.id;
  try {
    const empleado = await Empleado.findById(empleadoId);
    if (!empleado) {
      return res.status(404).json({
        ok: false,
        msg: "Empleado no existe",
      });
    }
    const empleadoEliminado = await Empleado.findByIdAndDelete(empleadoId);
    res.json({
      ok: true,
      msg: "Empleado eliminado",
      empleado: empleadoEliminado,
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
  getEmpleados,
  loginEmpleado,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
};
