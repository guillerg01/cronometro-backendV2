const { Schema, model } = require('mongoose');

const DireccionSchema = Schema({
  provincia: {
    type: String,
    required: true
  },
  municipio: {
    type: String,
    required: true
  },
  calle: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  }
});

const TrabajadorSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  ci: {
    type: Number,
    required: true
  },
  direccion: {
    type: DireccionSchema,
    required: true
  },
  docente: {
    type: Boolean,
    default: false,
    required:true
  },
  categoriaDocente: {
    type: String,
  
    required: false
  },
  categoriaCientifica: {
    type: String,
 
    required: false
  },
  escolaridad: {
    type: String,

    required: false
  },
  ocupacion: {
    type: String,

    required: false
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

TrabajadorSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Trabajador', TrabajadorSchema);