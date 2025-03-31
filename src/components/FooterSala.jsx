import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
// Importe a imagem da seta
import setaImage from './assets/seta.png'; // Caminho correto da imagem

const Footer = () => {
  // Função de logout (exemplo)
  const logout = () => {
    console.log("Logout realizado!");
    // Aqui você pode adicionar a lógica do logout, como limpar o localStorage ou redirecionar o usuário
  };

 
      {/* Seta de Logout fixada na parte inferior */}
      <img
        src={setaImage}
        alt="Seta de Logout"
        onClick={logout} // Ação de logout
        style={{
          position: "fixed", // Fixa a seta na tela
          bottom: "70px", // Distância da parte inferior da tela, acima do footer
          left: "20px", // Distância da parte esquerda da tela
          width: "40px", // Tamanho da seta
          cursor: "pointer", // Muda o cursor para a mãozinha ao passar sobre a seta
          zIndex: 2, // Garante que a seta fique acima do footer
        }}
      />
}

export default Footer;
