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
  ListItemText,
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
  const [exclusaoSucesso, setExclusaoSucesso] = useState(false);
  const [totalReservas, setTotalReservas] = useState(0);

  useEffect(() => {
    const idFromStorage = localStorage.getItem("id_usuario");

    if (!idFromStorage) {
      alert("Usuário não identificado. Faça login novamente.");
      navigate("/");
      return;
    }

    setIdUsuario(idFromStorage);
  }, [navigate]);

  // Função para carregar reservas do usuário
  const carregarReservas = () => {
    setLoading(true);
    sheets
      .getReservasPorUsuario(idUsuario)
      .then((response) => {
        setReservas(response.data.reservas || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar reservas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Função para carregar total de reservas
  const carregarTotalReservas = () => {
    sheets
      .getTotalReserva(idUsuario)
      .then((response) => {
        setTotalReservas(response.data.totalReservas);
      })
      .catch((error) => {
        console.error("Erro ao buscar total de reservas:", error);
      });
  };

  useEffect(() => {
    if (idUsuario) {
      carregarReservas();
      carregarTotalReservas();
    }
  }, [idUsuario]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("id_usuario");
    navigate("/");
  };

  const formatarDataHora = (inicio, fim) => {
    const [dataInicio, horaInicio] = inicio.split("T");
    const [dataFim, horaFim] = fim.split("T");

    const dataFormatada = dataInicio.split("-").reverse().join("/"); // AAAA-MM-DD → DD/MM/AAAA
    const horaInicioFormatada = horaInicio.slice(0, 5); // "14:00:00.000Z" → "14:00"
    const horaFimFormatada = horaFim.slice(0, 5);

    return `${dataFormatada} - ${horaInicioFormatada} até ${horaFimFormatada}`;
  };

  // Função para excluir reserva
  const excluirReserva = async (idReserva) => {
    if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) {
      return;
    }

    try {
      await sheets.deleteReserva(idReserva); // Chamada para API excluir reserva

      // Atualiza o estado local removendo a reserva excluída
      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.id_reserva !== idReserva)
      );

      carregarTotalReservas(); // Atualiza o total após exclusão

      setExclusaoSucesso(true); // Define o estado de sucesso
      setTimeout(() => setExclusaoSucesso(false), 2000); // Reseta o feedback após 2 segundos
    } catch (error) {
      console.error("Erro ao excluir reserva:", error.response?.data?.error || error);
      alert("Erro ao excluir reserva.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOPO */}
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
      </Box>

      {/* CONTEÚDO */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: "#D9D9D9" }}>
          <PersonOutlineIcon sx={{ fontSize: 50, color: "black" }} />
        </Avatar>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Minhas Reservas - Total: {totalReservas}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : reservas.length > 0 ? (
          <List sx={{ width: "80%", maxWidth: 400 }}>
            {reservas.map((reserva) => (
              <ListItem
                key={reserva.id_reserva}
                divider
                secondaryAction={
                  <Button
                    onClick={() => excluirReserva(reserva.id_reserva)}
                    color="error"
                    size="small"
                  >
                    Excluir
                  </Button>
                }
              >
                <ListItemText
                  primary={`Sala: ${reserva.fk_id_sala || "Não informado"}`}
                  secondary={formatarDataHora(
                    reserva.datahora_inicio,
                    reserva.datahora_fim
                  )}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Nenhuma reserva encontrada.</Typography>
        )}

        {/* Exibição de mensagem de sucesso */}
        {exclusaoSucesso && (
          <Typography color="green" sx={{ mt: 2 }}>
            Reserva excluída com sucesso!
          </Typography>
        )}
      </Box>

      {/* RODAPÉ */}
      <Box
        sx={{
          backgroundColor: "#b71c1c",
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
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

export default MinhasReservas;
