import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

function Panel() {
  return (
    <Paper elevation={5} className="p-6 max-w-screen-md mx-auto mt-20 text-center">
      <Typography variant="h4" className="mb-4 text-primary text-fuchsia-950 font-semibold">
        Bienvenido al Panel de Administración
      </Typography>
      <Typography variant="body1" className="mb-6">
        ¡Aquí puedes gestionar y controlar diversas funciones administrativas!
      </Typography>

    </Paper>
  );
}

export default Panel;
