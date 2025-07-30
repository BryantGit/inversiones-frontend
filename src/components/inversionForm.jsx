// src/components/InversionModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { getInversiones } from '../api/connection.js';

const InversionModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({
    montoInicial: '',
    tasaInteres: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    plazoMeses: '',
  });

  const [calculos, setCalculos] = React.useState({
    rendimientoMensual: 0,
    rendimientoPrimerAnio: 0,
    rendimientoTotal: 0,
    saldoFinal: 0
  });
  React.useEffect(() => {
    const monto = parseFloat(formData.montoInicial);
    const tasa = parseFloat(formData.tasaInteres);
    const plazo = parseInt(formData.plazoMeses);

    if (!isNaN(monto) && !isNaN(tasa) && !isNaN(plazo)) {
      const tasaMensual = tasa / 12 / 100;
      const rendimientoMensual = monto * tasaMensual;
      const rendimientoPrimerAnio = rendimientoMensual * 12;
      const rendimientoTotal = rendimientoMensual * plazo;
      const saldoFinal = monto + rendimientoTotal;

      setCalculos({
        rendimientoMensual,
        rendimientoPrimerAnio,
        rendimientoTotal,
        saldoFinal
      });
    }
  }, [formData.montoInicial, formData.tasaInteres, formData.plazoMeses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
  try {
    await onSave({
      MontoInicial: parseFloat(formData.montoInicial),
      TasaInteresAnual: parseFloat(formData.tasaInteres)/100,
      FechaInicio: formData.fechaInicio,
      PlazoMeses: parseInt(formData.plazoMeses, 10),
    });
    onClose();
    setFormData({ montoInicial: '', tasaInteres: '', fechaInicio: '', plazoMeses: '' });
  } catch (err) {
    alert("Hubo un error al guardar la inversión");
    console.error(err);
  }
};
return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Inversión</DialogTitle>
      <DialogContent>
        {/* Campos de entrada */}
        <TextField
          label="Monto Inicial"
          name="montoInicial"
          value={formData.montoInicial}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tasa de Interés Anual (%)"
          name="tasaInteres"
          value={formData.tasaInteres}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Plazo (meses)"
          name="plazoMeses"
          value={formData.plazoMeses}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />

        {/* Campos calculados (solo lectura) */}
        <TextField
          label="Rendimiento Mensual"
          value={calculos.rendimientoMensual.toFixed(2)}
          InputProps={{ readOnly: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rendimiento Primer Año"
          value={calculos.rendimientoPrimerAnio.toFixed(2)}
          InputProps={{ readOnly: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rendimiento Total"
          value={calculos.rendimientoTotal.toFixed(2)}
          InputProps={{ readOnly: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Saldo Final"
          value={calculos.saldoFinal.toFixed(2)}
          InputProps={{ readOnly: true }}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InversionModal;
