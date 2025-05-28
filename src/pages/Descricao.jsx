import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Box, Typography, Button, Paper, IconButton, List, ListItem, ListItemText, CircularProgress
} from "@mui/material";
import logosenai from "../assets/logo-senai.png";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import api from "../axios/axios"; // Instância axios configurada com o token

export default function SalaDetalhes() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { sala, idUser } = state;
  const [reservas, setReservas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.getAllReservasPorSala(sala.id_sala);
        setReservas(response.data.reservas);
      } catch (error) {
        console.log("Erro ao buscar reservas da sala:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sala?.id_sala) {
      fetchReservas();
    }
  }, [sala]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  if (!sala) {
    return <Typography>Erro: dados da sala não encontrados.</Typography>;
  }

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
        <PersonOutlineIcon
          sx={{ marginLeft: "10px", fontSize: 30, cursor: "pointer", color: "black" }}
         onClick={() => navigate("/perfil", { state: { idUser } })}
          />

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

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/calendario", { state: { sala, idUser } })}
            sx={{
              backgroundColor: "#b71c1c",
              '&:hover': { backgroundColor: "#a31818" },
              width: 150
            }}
          >
            Agendar
          </Button>
        </Box>

        {/* Reservas da sala */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Reservas dessa sala:</Typography>
        {loading ? (
          <CircularProgress />
        ) : reservas.length === 0 ? (
          <Typography>Nenhuma reserva encontrada.</Typography>
        ) : (
          <List sx={{ width: '100%', maxWidth: 500 }}>
            {reservas.map((reserva) => (
              <ListItem key={reserva.id_reserva} sx={{ backgroundColor: "#e0e0e0", mb: 1, borderRadius: 1 }}>
              <ListItemText
                primary={`Data: ${new Date(reserva.datahora_inicio).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}`}
                secondary={`Horário: ${new Date(reserva.datahora_inicio).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} - ${new Date(reserva.datahora_fim).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}`}
              />
            </ListItem>
            ))}
          </List>
        )}
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