import React from "react";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#B30E0A",
        width: "100%",
        height: "35px", //Define o tamanho
        position: "fixed", //Define a posição que ficará na pagina
        bottom: 0,
        display: "flex",
        justifyContent: "center", // Alinha o texto horizontalmente
        alignItems: "center", // Alinha o texto verticalmente
        color: "white", // Garante que o texto seja visível
        fontSize: "17px", // Ajusta o tamanho da fonte conforme necessário
        padding: "0 10px", // Adiciona um pequeno padding para o texto não ficar colado nas bordas
      }}
    >
      <p>Desenvolvido por Priscila, Maria Luisa e Gabriel</p>
    </Box>
  );
};

export default Footer;
