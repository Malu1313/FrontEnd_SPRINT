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

function Login() {
  const [user, setUser] = useState({
    
    email: "",
    password: "",
   
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postLogin(user);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <Container
      
      sx={{
        backgroundColor: "#F26F6F",
        minHeight: "100vh",
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
            id="email"
            label="Email"
            name="email"
            margin="normal"
            value={user.email}
            onChange={onChange}
            sx={{ backgroundColor: "white", borderRadius: 1 , border:"5"}}
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
          <Link>
          <Button
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "white",
              color: "#c81f11",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Entrar
          </Button>
          </Link>
          <Link
            to="/Cadastro"
            style={{
              color: "FF0802",
              textDecoration: "underline",
              display: "block",
              textAlign: "center",
            }}
          >
            Não tem conta? Faça o Cadastro
          </Link>
          
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
