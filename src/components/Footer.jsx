// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#B30E0A', // Cor de fundo
        color: 'black',          // Cor do texto
        padding: '7px',         // Espaçamento interno
        textAlign: 'center',     // Centralizar o texto
        position: 'fixed',       // Manter o footer fixo
        bottom: 0,               // Colocar o footer no final da página
        width: '100%',           // Garantir que ocupe toda a largura da tela
        fontSize: '10px',        // Tamanho da fonte
      }}
    >
      <Typography >
        &copy; Desenvolvido por Priscila, Maria Luisa e Gabriel.
      </Typography>
    </Box>
  );
};

export default Footer;
