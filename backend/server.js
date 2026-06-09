const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// 🛠️ Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// ⚡ Conexión Directa a Supabase (Usa el puerto web estándar 443, ¡adiós bloqueos de módem!)
const SUPABASE_URL = "https://adxmbrfmrneezoogibws.supabase.co";
const SUPABASE_KEY = "sb_publishable_HSorgPiGkV1BwdGAN1LDTQ_f-KUvrmE"; // 👈 Pega aquí tu clave anon larga

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Verificación inicial de conexión
if (supabase) {
    console.log('🟢 [Supabase] Cliente inicializado correctamente. Conectando por canales web...');
}

// 📡 Ruta para recibir y guardar los datos del formulario
app.post('/api/fuentes', async (req, res) => {
    console.log('📥 Datos recibidos desde el formulario:', req.body);
    
    const { idFuente, nombre, linea, empleado, destino } = req.body;

    try {
        // Insertar datos directamente en la tabla de Supabase
        const { data, error } = await supabase
            .from('fuentes')
            .insert([
                { idFuente, nombre, linea, empleado, destino }
            ]);

        if (error) throw error;

        console.log('✅ Fuente guardada con éxito en Supabase.');
        res.status(201).json({ mensaje: '¡Fuente guardada exitosamente en Supabase!' });

    } catch (error) {
        console.error('🔴 Error interno en el proceso de guardado:', error.message);
        res.status(500).json({ error: 'Error interno al procesar la solicitud en Supabase.' });
    }
});

// 🚀 Inicio del Servidor
app.listen(PORT, () => {
    console.log(`🚀 [Server] Ejecutándose correctamente en: http://localhost:${PORT}`);
});