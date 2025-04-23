import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import logosenai from "../assets/logo-senai.png";
import LogoutIcon from '@mui/icons-material/Logout';

export default function SalaDetalhes() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const sala = state?.sala;

  if (!sala) {
    return <Typography>Erro: dados da sala não encontrados.</Typography>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topo vermelho com logo (sem ícone de pessoa) */}
      <Box sx={{ backgroundColor: "#b71c1c", height: 50, display: "flex", alignItems: "center", justifyContent: "start", px: 2 }}>
        <img src={logosenai} alt="SENAI" style={{ height: 40 }} />
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

        <Box textAlign="left">
          <Button
            variant="contained"
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

      {/* Rodapé com ícone de logout no canto inferior direito */}
      <Box sx={{ backgroundColor: "#b71c1c", height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
        <Box sx={{ color: "white", fontSize: 24 }}>⏎</Box>
        <IconButton onClick={handleLogout} sx={{ color: "#fff" }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
