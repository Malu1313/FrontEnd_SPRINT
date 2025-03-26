import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";

import logosenai from "../assets/logo-senai.png";

function Cadastro() {
  const [usuario, setUser] = useState({
    cpf: "",
    email: "",
    senha: "",
    nome: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postCadastro(usuario);
      alert(response.data.message);
      navigate("/sala");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#B30E0A",
        padding: 1,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <img
        src={logosenai}
        alt="Logo do Senai"
        style={{
          width: "200px",
          height: "auto",
          marginTop: "-10%"
        }}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: "-10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          required
          id="nome"
          label="Nome"
          name="nome"
          margin="normal"
          value={usuario.nome}
          onChange={onChange}
          sx={{ 
            backgroundColor: "white", 
            borderRadius: 5,
            width: '130%' }}
        />
        <TextField
          required
          id="email"
          label="Email"
          name="email"
          margin="normal"
          value={usuario.email}
          onChange={onChange}
          sx={{ 
            backgroundColor: "white", 
            borderRadius: 5,
            width: '130%' }}
        />
        <TextField
          required
          id="senha"
          label="Senha"
          name="senha"
          margin="normal"
          type="password"
          value={usuario.senha}
          onChange={onChange}
          sx={{ 
            backgroundColor: "white", 
            borderRadius: 5,
            width: '130%'}}
        />
        <TextField
          required
          id="cpf"
          label="CPF"
          name="cpf"
          margin="normal"
          value={usuario.cpf}
          onChange={onChange}
          sx={{ 
            backgroundColor: "white", 
            borderRadius: 5,
            width: '130%'}}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, mb: 1, backgroundColor: "#FF0802" }}
          component={Link}
          to = "/"
        >

          Cadastrar
        </Button>
        <Button
          sx={{ mt: 1, color: "white" }}
          component={Link}
          to="/"
        >
          Já está cadastrado? Clique aqui
        </Button>
      </Box>
    </Container>
  );
}

export default Cadastro;
