import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios"
import logosenai from "../assets/logo-senai.png";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login(){
    await api.postLogin(user).then(
      (response)=>{
        alert(response.data.message)
        localStorage.setItem('authenticated', true)
        navigate("sala/")
      },
    (error)=>{
      console.log(error)
      alert(error.response.data.error)
    }
    )
  }

    return (
      <Container
        sx={{
          backgroundColor: "#F26F6F",
          minHeight: "80vh",
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
            backgroundColor: "#B30E0A", // Fundo vermelho 
            padding: 4, // Espaçamento interno maior
            borderRadius: 5, // Bordas arredondadas
            width: "250px", // fundo ocupe todo o espaço disponível
            maxWidth: "300px", //  largura máxima
            color: "white", 
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
              id="email"
              label="Email"
              name="email"
              margin="normal"
              value={user.email}
              onChange={onChange}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
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
                  marginTop: 3, 
                  marginBottom: 2, 
                  backgroundColor: "#FF0802", 
                  color: "white", 
                  
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
                color: "white",
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
  