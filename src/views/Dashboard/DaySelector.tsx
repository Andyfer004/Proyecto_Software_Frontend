import React from 'react';


const DaySelector = () => {
    return (
        <>
            <div style={{ marginBottom: '20px' }}> {/* Espacio inferior para separarlo del ProgressBar */}
                <select style={selectStyle}>
                <option value="Monday">Today</option>
                </select>
            </div>
      </>
    );
  };
  
  const selectStyle = {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    width: '100%', // Ajusta el ancho según sea necesario
  };

  
export default DaySelector;