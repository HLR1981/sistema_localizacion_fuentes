import React, { useState } from 'react';

function App() {
  // 1. Estado para controlar los campos del formulario
  const [formData, setFormData] = useState({
    idFuente: '',
    nombre: '',
    linea: '',
    empleado: '',
    destino: ''
  });

  // Función para capturar lo que el usuario escribe en tiempo real
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 2. Función corregida para enviar los datos al Backend en RENDER
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📥 Enviando datos al servidor en la nube:', formData);

    try {
      // 🚀 CAMBIO CLAVE: Ahora apunta a tu servidor real en Render
      const response = await fetch('https://sistema-localizacion-fuentes.onrender.com/api/fuentes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // ✨ SOLUCIÓN AL FALSO ERROR: response.ok acepta códigos de éxito 200 y 201
      if (response.ok) {
        alert(`🟢 ${data.mensaje || '¡Fuente guardada exitosamente!'}`);
        
        // Limpiar el formulario automáticamente tras el éxito
        setFormData({
          idFuente: '',
          nombre: '',
          linea: '',
          empleado: '',
          destino: ''
        });
      } else {
        // Si el servidor responde con un error real (ej. 400 o 500)
        alert(`🔴 Error del servidor: ${data.error || 'No se pudo procesar la solicitud.'}`);
      }

    } catch (error) {
      console.error('🔴 Error de red en el Frontend:', error);
      alert('🔴 Error de conexión: Hubo un problema al conectar con el servidor en Render.');
    }
  };

  // 3. El diseño visual del formulario
  return (
    <div style={{
      maxWidth: '450px',
      margin: '60px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#33]'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '25px', 
        color: '#1e293b',
        fontWeight: '600'
      }}>
        📍 Registro de Fuentes
      </h2>
      
      <form onSubmit={handleSubmit}>
        
        {/* Campo: ID Fuente */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#475569' }}>
            ID Fuente:
          </label>
          <input 
            type="text" 
            name="idFuente" 
            value={formData.idFuente} 
            onChange={handleChange} 
            required 
            placeholder="Ej. FNT-001"
            style={inputStyle}
          />
        </div>

        {/* Campo: Nombre */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#475569' }}>
            Nombre de Equipo:
          </label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
            placeholder="Ej. Densímetro Nuclear"
            style={inputStyle}
          />
        </div>

        {/* Campo: Línea / Tanque */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#475569' }}>
            Línea / Tanque:
          </label>
          <input 
            type="text" 
            name="linea" 
            value={formData.linea} 
            onChange={handleChange} 
            required 
            placeholder="Ej. Línea de Producción A"
            style={inputStyle}
          />
        </div>

        {/* Campo: Empleado */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#475569' }}>
            Número de Empleado / Operador:
          </label>
          <input 
            type="text" 
            name="empleado" 
            value={formData.empleado} 
            onChange={handleChange} 
            required 
            placeholder="Ej. EMP-8824"
            style={inputStyle}
          />
        </div>

        {/* Campo: Destino */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px', color: '#475569' }}>
            Taller o Almacén Destino:
          </label>
          <input 
            type="text" 
            name="destino" 
            value={formData.destino} 
            onChange={handleChange} 
            required 
            placeholder="Ej. Taller de Mantenimiento Norte"
            style={inputStyle}
          />
        </div>

        {/* Botón de envío */}
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#10b981', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer', 
            fontSize: '16px', 
            fontWeight: '600',
            transition: 'background-color 0.2s ease',
            boxShadow: '0 2px 5px rgba(16, 185, 129, 0.2)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          💾 Guardar Fuente en Supabase
        </button>

      </form>
    </div>
  );
}

// Estilos rápidos compartidos para los inputs
const inputStyle = {
  width: '100%', 
  padding: '10px 12px', 
  boxSizing: 'border-box',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
  outline: 'none',
  backgroundColor: '#f8fafc',
  color: '#334155',
  transition: 'border-color 0.2s'
};

export default App;