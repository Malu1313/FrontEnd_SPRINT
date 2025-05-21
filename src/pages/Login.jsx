import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";
import logosenai from "../assets/logo-senai.png";


function Login() {
  const [usuario, setUser] = useState({
    email: "",
    senha: ""
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postLogin(usuario);
      console.log(response.data.message)
      alert(response.data.message);

      const token = response.data.token;
      localStorage.setItem("token", token);

      localStorage.setItem('authenticated', true);      
      navigate("/salas", { state: { idUser: response.data.user.id_usuario } });
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
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
              width: "200px", // Define o tamanho da imagem
              height: "auto", // Mantém a proporção da imagem
              //marginBottom: "1px", // Espaço abaixo da imagem
            }}
          />
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
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
            borderRadius: 3,
            width: '100%',
            
          }}
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
            borderRadius: 3,
            width: '100%'}}
        />
        
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, mb: 1, backgroundColor: "#FF0802" }}
        >
          ENTRAR
        </Button>
        <Button
          sx={{ mt: 1, borderColor: "#d32f2f", color: "white" }}
          component={Link}
          to="/cadastro"
        >
          Ainda não tem uma conta? Faça o cadastro
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
