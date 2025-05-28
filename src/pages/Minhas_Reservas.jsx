import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import logosenai from "../assets/logo-senai.png";
import sheets from "../axios/axios";

function MinhasReservas() {
  const navigate = useNavigate();
  const [idUsuario, setIdUsuario] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idFromStorage = localStorage.getItem("id_usuario");

    if (!idFromStorage) {
      alert("Usuário não identificado. Faça login novamente.");
      navigate("/");
      return;
    }

    setIdUsuario(idFromStorage);
  }, [navigate]);

  useEffect(() => {
    if (!idUsuario) return;

    sheets.getReservasPorUsuario(idUsuario)
      .then((response) => {
        setReservas(response.data.reservas || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar reservas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idUsuario]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("id_usuario");
    navigate("/");
  };

  const formatarDataHora = (inicio, fim) => {
    const data = new Date(inicio).toLocaleDateString("pt-BR");
    const horaInicio = new Date(inicio).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const horaFim = new Date(fim).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return `${data} - ${horaInicio} até ${horaFim}`;
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", display: "flex", flexDirection: "column" }}>
      {/* TOPO */}
      <Box sx={{ backgroundColor: "#b71c1c", height: 50, display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
        <img src={logosenai} alt="SENAI" style={{ height: 100 }} />
      </Box>

      {/* CONTEÚDO */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", mt: 6 }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: "#D9D9D9" }}>
          <PersonOutlineIcon sx={{ fontSize: 50, color: "black" }} />
        </Avatar>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Minhas Reservas:
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          reservas.length > 0 ? (
            <List sx={{ width: "80%", maxWidth: 400 }}>
              {reservas.map((reserva, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Sala: ${reserva.fk_id_sala || "Não informado"}`}
                    secondary={formatarDataHora(reserva.datahora_inicio, reserva.datahora_fim)}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>Nenhuma reserva encontrada.</Typography>
          )
        )}

        <Button
          variant="contained"
          onClick={() => navigate("/salas")}
          sx={{
            backgroundColor: "#b20000",
            color: "white",
            borderRadius: "10px",
            mt: 4,
            width: 160,
            "&:hover": { backgroundColor: "#8c0000" },
          }}
        >
          Voltar ao início
        </Button>
      </Box>

      {/* RODAPÉ */}
      <Box sx={{ backgroundColor: "#b71c1c", height: 40, display: "flex", alignItems: "center", justifyContent: "flex-start", px: 2 }}>
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MinhasReservas;
