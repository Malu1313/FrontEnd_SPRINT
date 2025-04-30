import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, IconButton, TextField } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import logosenai from "../assets/logo-senai.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import api from "../axios/axios"; // Instância axios configurada com o token

export default function CalendarioReserva() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {sala, idUser} = state;

  console.log("Sala: ", sala.id_sala, "Id_Usuario: ", idUser);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTimeInicio, setSelectedTimeInicio] = React.useState("");
  const [selectedTimeFim, setSelectedTimeFim] = React.useState("");

  if (!sala) {
    return <Typography>Erro: dados da sala não encontrados.</Typography>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const handleConfirmarReserva = async () => {
    if (!selectedTimeInicio || !selectedTimeFim) {
      alert("Por favor, selecione os horários de início e fim!");
      return;
    }
    
    const reservaData = {
      fk_id_sala: sala.id_sala,  // Número da sala (não o id)
      fk_id_usuario:idUser,
      datahora_inicio: selectedDate.toISOString().split('T')[0] + 'T' + selectedTimeInicio, // data e hora início
      datahora_fim: selectedDate.toISOString().split('T')[0] + 'T' + selectedTimeFim,   // data e hora fim
    };
    console.log("Dados da reserva:", reservaData);

    try {      
      const response = await api.postReserva(reservaData);
      alert(response.data.message);
      alert(`Sala ${sala.numero} reservada para ${selectedDate.toLocaleDateString()} de ${selectedTimeInicio} até ${selectedTimeFim}`);
      navigate("/salas",{ state: { idUser } });
    } catch (error) {
      console.log("Erro ao reservar a sala:", error.response?.data || error.message);
      alert(error.response.data.error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Topo vermelho */}
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

      {/* Conteúdo principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Selecione a data
        </Typography>

        <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f0f0f0", mb: 4 }}>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </Paper>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Escolha o horário de início
        </Typography>

        <TextField
          type="time"
          value={selectedTimeInicio}
          onChange={(e) => setSelectedTimeInicio(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Escolha o horário de término
        </Typography>

        <TextField
          type="time"
          value={selectedTimeFim}
          onChange={(e) => setSelectedTimeFim(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          onClick={handleConfirmarReserva}
          sx={{
            backgroundColor: "#b71c1c",
            '&:hover': { backgroundColor: "#a31818" },
            width: 150,
          }}
        >
          Confirmar
        </Button>
      </Box>

      {/* Rodapé vermelho */}
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
