import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Cadastro() {
 
    const [events, setEventos] = useState([]);

    async function getCadastro() {
      //Chamada da Api
      await api.getCadastro().then(
        (response) => {
          console.log(response.data.events);
          setCadastro(response.data.events);
        },
        (error) => {
          console.log("Erro ", error);
        }
      );
    }
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center" >

        <Typography component="h1" variant="h5">
        Cadastro
        </Typography>

        <Box component="form" noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            type="text"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            type="number"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
          />

          <Button type="submit" fullWidth variant="contained" >
            Cadastrar
          </Button>
          <Button fullWidth variant="contained">
            <Link to="/">Já tem uma conta? Faça login</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;