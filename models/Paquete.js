const { Schema, model } = require("mongoose");

const PaqueteSchema = Schema({
  paquete: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  direccionA: {
    type: String,
    required: true,
  },
  direccionB: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
});

PaqueteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Paquete", PaqueteSchema);
