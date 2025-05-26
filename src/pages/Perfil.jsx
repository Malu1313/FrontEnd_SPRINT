import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import logosenai from "../assets/logo-senai.png";


function Perfil() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id_usuario } = state;

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await api.getUsuario(id_usuario);
        setUsuario(response.data.usuario);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao buscar dados do usuário.");
      }
    }

    fetchUsuario();
  }, [id_usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };


  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", display: "flex", flexDirection: "column" }}>
      {/* TOPO */}
      <Box
        sx={{
          backgroundColor: "#b71c1c",
          height: 50,
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <img src={logosenai} alt="SENAI" style={{ height: 100 }} />
      </Box>

      {/* CONTEÚDO PRINCIPAL */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, mb: 4, bgcolor: "#D9D9D9" }}>
          <PersonOutlineIcon sx={{ fontSize: 50, color: "black" }} />
        </Avatar>

        <Box sx={{ width: "80%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome:"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            InputProps={{ readOnly: true }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
          <TextField
            label="Email:"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            InputProps={{ readOnly: true }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
          <TextField
            label="CPF:"
            name="cpf"
            value={usuario.cpf}
            onChange={handleChange}
            InputProps={{ readOnly: true }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
          <TextField
            label="Senha:"
            name="senha"
            type="password"
            value={usuario.senha}
            onChange={handleChange}
            InputProps={{ readOnly: true }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
        </Box>

        {/* BOTÕES */}
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b20000",
              color: "white",
              borderRadius: "10px",
              width: 100,
              "&:hover": { backgroundColor: "#8c0000" },
            }}
          >
            Modificar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b20000",
              color: "white",
              borderRadius: "10px",
              width: 120,
              "&:hover": { backgroundColor: "#8c0000" },
            }}
          >
            Excluir Conta
          </Button>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/minhas-reservas", { state: { id_usuario } })}
          sx={{
            backgroundColor: "#b20000",
            color: "white",
            borderRadius: "10px",
            width: 180,
            mt: 2,
            "&:hover": { backgroundColor: "#8c0000" },
          }}
        >
          Minhas Reservas
        </Button>
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
    
    </div>
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Perfil;
