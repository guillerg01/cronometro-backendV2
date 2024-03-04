const { Schema, model } = require("mongoose");

const DireccionSchema = Schema({
  provincia: {
    type: String,
    required: true,
  },
  municipio: {
    type: String,
    required: true,
  },
  calle: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
});

const EmpleadoSchema = Schema({
  ci: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  ocupacion: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  direccion: {
    type: DireccionSchema,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
});

module.exports = model("Empleado", EmpleadoSchema);
