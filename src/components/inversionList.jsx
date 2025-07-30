import React, { useEffect, useState } from 'react';
import { getInversiones } from '../api/connection.js';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import InversionModal from './inversionForm.jsx';
import { createInversion } from '../api/connection.js';
import { Box, TextField } from '@mui/material';
const columns = [
  { field: 'id', 
    headerName: 'ID',
    width: 90 
},
  {
    field: 'montoInicial',
    headerName: 'Monto Inicial',
    width: 150,
    editable: true,
  },
  {
    field: 'tasaInteres',
    headerName: 'Tasa de Interés',
    width: 150,
    editable: true,
  },
  {
    field: 'fechaInicio',
    headerName: 'Fecha de Inicio',
    width: 110,
    editable: true,
  },
  {
    field: 'plazoMeses',
    headerName: 'Plazo (Meses)',
    width: 160,
  },
];

export default function InversionList({ onSelect }) {
  const [inversiones, setInversiones] = useState([]);
  const [error, setError] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [busquedaId, setBusquedaId] = useState('');
const [inversionesFiltradas, setInversionesFiltradas] = useState([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const fetchInversiones = () => {
  getInversiones()
    .then(data => {
      const mapped = data.map(inv => ({
        id: inv.id,
        montoInicial: inv.montoinicial,
        tasaInteres: inv.tasainteresanual,
        fechaInicio: inv.fechainicio,
        plazoMeses: inv.plazomeses,
      }));
      setInversiones(mapped);
      setInversionesFiltradas(mapped); // <--- esto es lo que faltaba
    })
    .catch(err => setError(err.message));
};
const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    setBusquedaId(valor);
    if (valor === '') {
      setInversionesFiltradas(inversiones);
    } else {
      const idBuscado = parseInt(valor, 10);
      const resultado = inversiones.filter((inv) => inv.id === idBuscado);
      setInversionesFiltradas(resultado);
    }
  };

useEffect(() => {
  fetchInversiones();
}, []);

  if (error) return <div>Error: {error}</div>;
  const guardarInversion = async (data) => {
    const nueva = await createInversion(data); // Aquí haces el POST
    setInversiones(prev => [...prev, nueva]);  // Agregas la nueva inversión a la lista
    fetchInversiones(); // Refrescas la lista de inversiones
  };


  return (
      <div style={{ height: 400, width: '100%' }}>
       <h2>Lista de Inversiones</h2>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Buscar por ID"
          variant="outlined"
          value={busquedaId}
          onChange={handleBusquedaChange}
          type="number"
          sx={{ width: 200 }}
        />
        <Button onClick={handleOpenModal} variant="contained" color="primary">
          Agregar Inversión
        </Button>
      </Box>

      <DataGrid
        rows={inversionesFiltradas}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
      <InversionModal 
       
        open={openModal}
        onClose={handleCloseModal}
        onSave={guardarInversion}
      />
    </div>
  );
}
