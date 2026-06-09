const express = require('express');
const router = express.Router();
const path = require('path');

// Apuntamos directo al archivo del modelo que acabamos de limpiar arriba
const Fuente = require(path.join(__dirname, '../models/Fuente.js'));

// RUTA: POST /api/fuentes (Para GUARDAR)
router.post('/', async (req, res) => {
  try {
    const { idFuente, nombre, linea, empleado, destino } = req.body;

    const nuevaFuente = new Fuente({
      idFuente,
      nombre,
      linea,
      empleado,
      destino
    });

    const fuenteGuardada = await nuevaFuente.save();
    
    res.status(201).json({
      ok: true,
      mensaje: '¡Fuente registrada con éxito en la nube!',
      data: fuenteGuardada
    });

  } catch (error) {
    console.error('Error al guardar la fuente:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'No se pudo guardar la fuente',
      error: error.message
    });
  }
});

// RUTA: GET /api/fuentes (Para OBTENER)
router.get('/', async (req, res) => {
  try {
    const fuentes = await Fuente.find().sort({ fechaRegistro: -1 });
    res.json({
      ok: true,
      data: fuentes
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener las fuentes',
      error: error.message
    });
  }
});

module.exports = router;