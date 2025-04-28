import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, IconButton, TextField } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import logosenai from "../assets/logo-senai.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from "axios";

export default function CalendarioReserva() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const sala = state?.sala;

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState("");

  if (!sala) {
    return <Typography>Erro: dados da sala não encontrados.</Typography>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const handleConfirmarReserva = async () => {
    if (!selectedTime) {
      alert("Por favor, selecione um horário!");
      return;
    }
  
    const reservaData = {
      salaId: sala.id, // se for id mesmo, ok
      numero: sala.numero,
      data: selectedDate.toISOString().split('T')[0], // Fica no formato "2025-04-28"
      hora: selectedTime,
    };
  
    console.log("Dados da reserva:", reservaData);
  
    try {
      await axios.post('http://10.89.240.89:5000/projeto_senai/reservas', reservaData);
      alert(`Sala ${sala.numero} reservada para ${selectedDate.toLocaleDateString()} às ${selectedTime}`);
      navigate("/salas");
    } catch (error) {
      console.error("Erro ao reservar a sala:", error.response?.data || error.message);
      alert("Houve um erro ao realizar a reserva.");
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
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </Paper>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Escolha o horário
        </Typography>

        <TextField
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
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
