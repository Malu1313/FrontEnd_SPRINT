import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Person from "@mui/icons-material/Person";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";

function Cadastro() {
  const [user, setUser] = useState({
    cpf: "",
    email: "",
    password: "",
    name: "",
    data_nascimento: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postCadastro(user);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <Container
      //component="main"
      //maxWidth="xxl"
      sx={{
        backgroundColor: "#F26F6F",
       // minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#B30E0A", // Fundo vermelho SENAI
          padding: 4, // Espaçamento interno maior
          borderRadius: 5, // Bordas arredondadas
          width: "35%", // Garante que o fundo ocupe todo o espaço disponível
          //maxWidth: "400px", // Define uma largura máxima
          color: "white", // Deixa o texto branco para melhor contraste
        }}
      >
        <Avatar sx={{ margin: 1, backgroundColor: "white", color: "#c81f11" }}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "white" }}>
          Login
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            margin="normal"
            type="text"
            value={user.name}
            onChange={onChange}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />


          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            margin="normal"
            value={user.email}
            onChange={onChange}
            sx={{ backgroundColor: "white", borderRadius: 1, border: "5" }}
          />
          <TextField
            required
            fullWidth
            id="senha"
            label="Senha"
            name="password"
            margin="normal"
            type="password"
            value={user.password}
            onChange={onChange}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          <TextField
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            margin="normal"
            type="number"
            value={user.cpf}
            onChange={onChange}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          <Button
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "FF0802",
              color: "white",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Entrar
          </Button>
          <Link
            to="/"
            style={{
              color: "FF0802",
              textDecoration: "underline",
              display: "block",
              textAlign: "center",
            }}
          >
            Já tem conta? Faça o Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
