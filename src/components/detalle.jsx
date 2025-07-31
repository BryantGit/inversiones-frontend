import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button
} from '@mui/material';

const Detalle = ({ open, onClose, detalle }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles de la Inversión</DialogTitle>
      <DialogContent dividers>
        <>
          <Typography>
            <strong>ID:</strong> {detalle?.id ?? 'N/A'}
          </Typography>
          <Typography>
            <strong>Monto Inicial:</strong> {detalle?.montoInicial ?? 'N/A'}
          </Typography>
          <Typography>
            <strong>Tasa de Interés Anual:</strong>{' '}
            {detalle?.tasaInteres != null ? `${(detalle.tasaInteres * 100).toFixed(2)}%` : 'N/A'}
          </Typography>
          <Typography>
            <strong>Plazo (meses):</strong> {detalle?.plazoMeses ?? 'N/A'}
          </Typography>
          <Typography>
            <strong>Fecha Inicio:</strong> {detalle?.fechaInicio ?? 'N/A'}
          </Typography>
          <Typography>
            <strong>Rendimiento Mensual:</strong>{' '}
            {detalle?.rendimientoMensual != null ? Number(detalle.rendimientoMensual).toFixed(2) : 'N/A'}
          </Typography>
          <Typography>
            <strong>Rendimiento Primer Año:</strong>{' '}
            {detalle?.rendimientoPrimerAnio != null ? detalle.rendimientoPrimerAnio.toFixed(2) : 'N/A'}
          </Typography>
          <Typography>
            <strong>Rendimiento Total:</strong>{' '}
            {detalle?.interesTotal != null ? detalle.interesTotal.toFixed(2) : 'N/A'}
          </Typography>
          <Typography>
            <strong>Saldo Final:</strong>{' '}
            {detalle?.capitalFinal != null ? detalle.capitalFinal.toFixed(2) : 'N/A'}
          </Typography>
          <Typography>
            <strong>Fecha Fin:</strong> {detalle?.fechaFin ?? 'N/A'}
          </Typography>

          <Box mt={2}>
            <Button variant="contained" color="secondary" onClick={() => alert('Otra acción')}>
              Ver más detalles
            </Button>
          </Box>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default Detalle;
