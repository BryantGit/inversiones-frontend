import React, { useEffect, useState } from 'react';
import { getInversiones } from '../api/connection.js';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InversionModal from './inversionForm.jsx';
import { createInversion } from '../api/connection.js';

import Detalle from './Detalle.jsx';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'montoInicial', headerName: 'Monto Inicial', width: 150 },
  { field: 'tasaInteres', headerName: 'Tasa de Interés', width: 150 },
  { field: 'fechaInicio', headerName: 'Fecha de Inicio', width: 110 },
  { field: 'plazoMeses', headerName: 'Plazo (Meses)', width: 160 },
  {
    field: 'verDetalles',
    headerName: 'Detalles',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Button
        startIcon={<VisibilityIcon />}
        variant="outlined"
        size="small"
        onClick={() => {
          // Aquí puedes manejar la acción, por ejemplo:
          alert(`Detalles de la inversión ID: ${params.row.id}`);
        }}
      >
        Ver
      </Button>
    ),
  },
];

export default function InversionList() {
  const [inversiones, setInversiones] = useState([]);
  const [inversionesFiltradas, setInversionesFiltradas] = useState([]);
  const [error, setError] = useState(null);
  const [busquedaId, setBusquedaId] = useState('');
  const [openModalAgregar, setOpenModalAgregar] = useState(false);

  // Aquí los estados para el modal detalle:
  const [openModalDetalles, setOpenModalDetalles] = useState(false);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    fetchInversiones();
  }, []);

  const fetchInversiones = () => {
    getInversiones()
      .then((data) => {
        const mapped = data.map((inv) => ({
          id: inv.id,
          montoInicial: inv.montoinicial,
          tasaInteres: inv.tasainteresanual,
          fechaInicio: inv.fechainicio,
          plazoMeses: inv.plazomeses,
          rendimientoMensual: inv.rendimientomensual,
          rendimientoPrimerAnio: inv.rendimientoprimeranio,
          interesTotal: inv.interestotal,
          capitalFinal: inv.capitalfinal,
          fechaFin: inv.fechafin,
        }));
        setInversiones(mapped);
        setInversionesFiltradas(mapped);
      })
      .catch((err) => setError(err.message));
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

  const guardarInversion = async (data) => {
    await createInversion(data);
    fetchInversiones();
  };

  // Esta función abre el modal detalle con la inversión seleccionada
  const openDetailsModal = (row) => {
    setDetalle(row);
    setOpenModalDetalles(true);
  };

  if (error) return <div>Error: {error}</div>;

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
        <Button onClick={() => setOpenModalAgregar(true)} variant="contained" color="primary">
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


      <InversionModal open={openModalAgregar} onClose={() => setOpenModalAgregar(false)} onSave={guardarInversion} />
    </div>
  );
}
