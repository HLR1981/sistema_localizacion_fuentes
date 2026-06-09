const excelService = require('../services/excelService');

exports.registrarMovimiento = async (req, res) => {
    try {
        const { id_fuente, nueva_estacion } = req.body;

        // Validar que los datos del escaneo no lleguen vacíos
        if (!id_fuente || !nueva_estacion) {
            return res.status(400).json({ 
                success: false, 
                message: "Error: Falta el Component ID de la fuente o la estación de destino." 
            });
        }

        // Ejecutar el servicio que edita el Excel
        await excelService.actualizarUbicacionExcel(id_fuente, nueva_estacion);

        return res.status(200).json({
            success: true,
            message: `Movimiento registrado. La fuente ${id_fuente} ahora está en: ${nueva_estacion}.`
        });

    } catch (error) {
        console.error("Error en el controlador:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message || "Error interno en el servidor al procesar el archivo." 
        });
    }
};