const mongoose = require('mongoose');

// El molde con las reglas de la base de datos
const FuenteSchema = new mongoose.Schema({
  idFuente: {
    type: String,
    required: [true, 'El ID de la fuente es obligatorio'],
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre de la fuente es obligatorio'],
    trim: true
  },
  linea: {
    type: String,
    required: [true, 'La línea o área es obligatoria'],
    trim: true
  },
  empleado: {
    type: String,
    required: [true, 'El nombre del empleado responsable es obligatorio'],
    trim: true
  },
  destino: {
    type: String,
    required: [true, 'El destino de la fuente es obligatorio'],
    trim: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Fuente', FuenteSchema);