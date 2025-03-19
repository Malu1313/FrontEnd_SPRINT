import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";
import logosenai from "../assets/logo-senai.png";
import seta from "../assets/seta.png"
import avatar from "../assets/boneco.png"

function Cadastro() {
  const [user, setUser] = useState({
    cpf: "",
    email: "",
    password: "",
    name: "",
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
      sx={{
        maxHeight:"xl",
       backgroundColor: "#F26F6F",
       height: "100vh",
       display: "flex",
       width: "100%", 
       justifyContent:"center",
       alignItems:"center"
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#B30E0A", // Fundo vermelho
          padding: 5, // Espaçamento interno maior
          borderRadius: 5, // Bordas arredondadas
          width: "300px", //  fundo ocupe todo o espaço disponível
          
        }}
      >
        <img
          src={logosenai}
          alt="Logo do Senai"
          style={{
            width: "200px", // Define o tamanho da imagem
            height: "auto", // Mantém a proporção da imagem
            marginBottom: "0px", // Espaço abaixo da imagem
          }}
        />
        
        

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
          <TextField
            required
            fullWidth
            id="nome"
            label="Nome"
            name="name"
            margin="normal"
            //type="normal"
            value={user.nome}
            onChange={onChange}
            sx={{ backgroundColor: "white", borderRadius: 5 }}
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
            sx={{ backgroundColor: "white", borderRadius: 5 }}
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
            sx={{ backgroundColor: "white", borderRadius: 5 }}
          />

          <TextField
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            margin="normal"
            type="normal"
            value={user.cpf}
            onChange={onChange}
            sx={{ backgroundColor: "white", borderRadius: 5 }}
          />

          <Button
            sx={{
              marginTop: 3, // Corrigido o nome da propriedade
              marginBottom: 2, // Corrigido o nome da propriedade
              backgroundColor: "#FF0802", // Corrigido o valor hexadecimal (adicionando #)
              color: "white",
              border: "2",
            }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Cadastrar
          </Button>

          <Link
            to="/"
            style={{
              color: "white",
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
