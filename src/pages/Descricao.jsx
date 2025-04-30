import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, IconButton, Modal, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import logosenai from "../assets/logo-senai.png";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import api from "../axios/axios"; // Instância axios configurada com o token

export default function SalaDetalhes() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {sala, idUser} = state;

  console.log("Sala: ", sala.id_sala, "Id_Usuario: ", idUser);

  if (!sala) {
    return <Typography>Erro: dados da sala não encontrados.</Typography>;
  }

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topo vermelho com logo */}
      <Box
        sx={{
          backgroundColor: "#b71c1c",
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <img src={logosenai} alt="SENAI" style={{ height: 100 }} />
        <IconButton sx={{ color: "black" }}>
          <PersonOutlineIcon />
        </IconButton>
      </Box>

      {/* Nome da sala */}
      <Box sx={{ backgroundColor: "#f0f0f0", px: 4, py: 1, mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{sala.numero}</Typography>
      </Box>

      {/* Conteúdo principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Descrição :</Typography>
        <Paper elevation={2} sx={{ padding: 2, mb: 4, width: '100%', maxWidth: 500, backgroundColor: '#f0f0f0' }}>
          {sala.descricao}
        </Paper>

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Capacidade :</Typography>
        <Paper elevation={2} sx={{ padding: 2, mb: 3, width: '100%', maxWidth: 500, backgroundColor: '#f0f0f0' }}>
          Máxima : {sala.capacidade} alunos
        </Paper>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/calendario", { state: { sala, idUser} })}
            sx={{
              backgroundColor: "#b71c1c",
              '&:hover': { backgroundColor: "#a31818" },
              width: 150
            }}
          >
            Agendar
          </Button>

         
        </Box>
      </Box>

      {/* Footer com logout */}
      <Box
        sx={{
          backgroundColor: "#b71c1c",
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <LogoutIcon />
        </IconButton>
      </Box>

     
        </Box>
      
    
  );
}
