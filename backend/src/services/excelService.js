const ExcelJS = require('exceljs');
const path = require('path');

// 🛠️ Nombre exacto: Fuentes1.xlsx
const excelPath = path.join(process.cwd(), 'database', 'Fuentes1.xlsx');

exports.actualizarUbicacionExcel = async (idFuente, nuevaEstacion) => {
    const workbook = new ExcelJS.Workbook();
    
    // 1. Leer el archivo Excel actual
    await workbook.xlsx.readFile(excelPath);
    const worksheet = workbook.getWorksheet(1); // Abre la primera pestaña

    let filaEncontrada = false;

    // 2. Buscar fila por fila omitiendo la fila 1 (encabezados)
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; 

        const cellId = row.getCell(1).value; // Columna A: Component ID
        
        // Compara el ID del Excel con el que mandó el celular
        if (cellId && cellId.toString().trim() === idFuente.toString().trim()) {
            // Columna C: Sobreescribe únicamente el campo 'Location'
            row.getCell(3).value = nuevaEstacion; 
            filaEncontrada = true;
        }
    });

    // 3. Si no encuentra el ID, levanta un error protector
    if (!filaEncontrada) {
        throw new Error(`El Component ID '${idFuente}' no existe en el registro.`);
    }

    // 4. Guardar los cambios aplicados en el archivo físico
    await workbook.xlsx.writeFile(excelPath);
    return true;
};