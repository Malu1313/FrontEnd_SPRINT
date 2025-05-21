import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios/axios"; // Certifique-se de que getUsuario está definido
import LogoutIcon from "@mui/icons-material/Logout";

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
    navigate("/"); // Redireciona para a tela inicial ou login
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 6,
        }}
      >
        <Box
          sx={{
            width: "80%",
            maxWidth: 300,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
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

        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b20000",
              color: "white",
              borderRadius: "10px",
              width: 120,
            }}
          >
            Modificar
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              navigate("/minhas-reservas", { state: { id_usuario } })
            }
            sx={{
              backgroundColor: "#b20000",
              color: "white",
              borderRadius: "10px",
              width: 180,
            }}
          >
            Minhas Reservas
          </Button>
        </Box>

        <IconButton onClick={handleLogout} sx={{ color: "black", mt: 2 }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Perfil;
