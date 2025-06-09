import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import logosenai from "../assets/logo-senai.png";

function Perfil() {
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem("id_usuario");

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        if (!id_usuario) return;

        const response = await api.getUsuario(id_usuario);
        const userData = response.data.user;

        setUsuario({
          nome: userData.nome || "",
          email: userData.email || "",
          cpf: userData.cpf || "",
          senha: "******", // ocultar senha
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }

    fetchUsuario();
  }, [id_usuario]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("id_usuario");
    navigate("/");
  };

  async function handleDeleteAccount() {
    if (!id_usuario) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação é irreversível."
    );
    if (!confirmDelete) return;

    try {
      await api.deleteUser(id_usuario);

      localStorage.removeItem("authenticated");
      localStorage.removeItem("id_usuario");

      alert("Conta excluída com sucesso.");
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir conta:", error.response?.data?.error);
      alert("Erro ao excluir conta. Tente novamente.");
    }
  }

  async function handleSalvar() {
    try {
      const { nome, email, cpf, senha } = usuario;
      const senhaParaEnviar = senha === "******" ? undefined : senha;

      const payload = {
        nome,
        email,
        cpf,
        ...(senhaParaEnviar && { senha: senhaParaEnviar }),
      };

      console.log("Enviando dados:", payload);

      await api.putUsuario(id_usuario, payload);

      alert("Dados atualizados com sucesso!");
      setEditando(false);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao salvar alterações. Tente novamente.");
    }
  }

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", display: "flex", flexDirection: "column" }}>
      <Box sx={{ backgroundColor: "#b71c1c", height: 50, display: "flex", alignItems: "center", px: 2 }}>
        <img src={logosenai} alt="SENAI" style={{ height: 100 }} />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", mt: 6 }}>
        <Avatar sx={{ width: 100, height: 100, mb: 4, bgcolor: "#D9D9D9" }}>
          <PersonOutlineIcon sx={{ fontSize: 50, color: "black" }} />
        </Avatar>

        <Box sx={{ width: "80%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome:"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            InputProps={{ readOnly: !editando }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
          <TextField
            label="Email:"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            InputProps={{ readOnly: !editando }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
          <TextField
            label="CPF:"
            name="cpf"
            value={usuario.cpf}
            onChange={handleChange}
            InputProps={{ readOnly: !editando }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
          <TextField
            label="Senha:"
            name="senha"
            type="password"
            value={usuario.senha}
            onChange={handleChange}
            InputProps={{ readOnly: !editando }}
            sx={{ backgroundColor: "#D9D9D9" }}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          {!editando ? (
            <Button
              variant="contained"
              onClick={() => setEditando(true)}
              sx={{
                backgroundColor: "#b20000",
                color: "white",
                borderRadius: "10px",
                width: 120,
                "&:hover": { backgroundColor: "#8c0000" },
              }}
            >
              Modificar
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSalvar}
              sx={{
                backgroundColor: "#b20000",
                color: "white",
                borderRadius: "10px",
                width: 120,
                "&:hover": { backgroundColor: "#8c0000" },
              }}
            >
              Salvar
            </Button>
          )}

          <Button
            variant="contained"
            onClick={handleDeleteAccount}
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
          onClick={() => navigate("/minhasReservas", { state: { id_usuario } })}
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

      <Box sx={{ backgroundColor: "#b71c1c", height: 40, display: "flex", alignItems: "center", justifyContent: "flex-start", px: 2 }}>
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Perfil;
