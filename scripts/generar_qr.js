const bwipjs = require('bwip-js');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const excelPath = path.join(process.cwd(), 'database', 'Fuentes1.xlsx');

// Función para generar el QR con fondo blanco y texto GRANDE
function guardarImagenQRConTexto(id, tipo) {
    return new Promise((resolve, reject) => {
        const infoQR = JSON.stringify({ id, tipo });
        const subcarpeta = tipo === 'fuente' ? 'fuentes' : 'estaciones';
        
        const carpetaDestino = path.join(process.cwd(), 'scripts', subcarpeta);
        const destinoFinalArchivo = path.join(carpetaDestino, `${id.replace(/[\/\\:*?"<>|]/g, '_')}.png`);

        if (!fs.existsSync(carpetaDestino)) {
            fs.mkdirSync(carpetaDestino, { recursive: true });
        }

        // Configuración mejorada para etiquetas legibles y claras
        bwipjs.toBuffer({
            bcid:            'qrcode',       // Tipo: QR
            text:            infoQR,         // Datos en el QR
            scale:           4,              // Sube la resolución para que no se vea pixeleado
            height:          100,            
            width:           100,            
            includetext:     true,           // Activa el texto abajo
            alttext:         id,             // Texto que va a pintar (el ID)
            textxalign:      'center',       // Centrado
            textsize:        14,             // 💥 LETRA MÁS GRANDE (Antes era 11)
            textgaps:        3,              // Espacio extra entre el QR y el texto
            backgroundcolor: 'FFFFFF',       // 💥 FONDO BLANCO SOLIDO (Evita que se vea oscuro)
            paddingtop:      10,             // Margen superior
            paddingbottom:   15,             // Margen inferior para que no se corte la letra
            paddingleft:     10,             
            paddingright:    10
        }, function (err, pngBuffer) {
            if (err) {
                console.error(`❌ Error al procesar QR para ${id}:`, err);
                reject(err);
            } else {
                fs.writeFileSync(destinoFinalArchivo, pngBuffer);
                console.log(`✅ ¡Guardado perfecto!: ${subcarpeta}/${id}.png`);
                resolve();
            }
        });
    });
}

async function generarQRsDesdeExcel() {
    console.log("🚀 Generando etiquetas de alta visibilidad (Fondo Blanco + Letra Grande)...");
    const workbook = new ExcelJS.Workbook();
    
    try {
        await workbook.xlsx.readFile(excelPath);
        const worksheet = workbook.getWorksheet(1);

        const fuentesProcesadas = new Set();
        const estacionesProcesadas = new Set();

        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const idFuente = row.getCell(1).value;  
            const ubicacion = row.getCell(3).value; 

            if (idFuente) {
                const idLimpio = idFuente.toString().trim();
                if (!fuentesProcesadas.has(idLimpio)) {
                    fuentesProcesadas.add(idLimpio);
                    await guardarImagenQRConTexto(idLimpio, 'fuente');
                }
            }

            if (ubicacion) {
                const ubicacionLimpia = ubicacion.toString().trim();
                if (!estacionesProcesadas.has(ubicacionLimpia)) {
                    estacionesProcesadas.add(ubicacionLimpia);
                    await guardarImagenQRConTexto(ubicacionLimpia, 'estacion');
                }
            }
        }

        console.log("🏁 ¡Listo! Abre tus carpetas y verás los nuevos QRs bien claros.");

    } catch (error) {
        console.error("❌ Error leyendo el Excel:", error);
    }
}

generarQRsDesdeExcel();