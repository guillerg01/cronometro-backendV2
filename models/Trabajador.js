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
    required: true,
  },
  ocupacion: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  direccion: {
    type: DireccionSchema,
    required: true,
  },
});

EmpleadoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Trabajador", EmpleadoSchema);
