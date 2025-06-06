import { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import api from "../axios/axios";
import logosenai from "../assets/logo-senai.png";

function ListSalas() {
  const [salas, setSalas] = useState([]);
  const [busca, setBusca] = useState(""); 
  const [dataBusca, setDataBusca] = useState("");
  const [horarioBusca, setHorarioBusca] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const idUser = state.idUser;

  async function getSalas() {
    try {
      const response = await api.getSala();
      setSalas(response.data.sala);
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  }

  const handleRowClick = (sala) => {
    navigate("/descricao", { state: { sala, idUser } });
  };

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    getSalas();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0];
  };

  const salasFiltradas = salas.filter((sala) => {
    const reservas = sala.reservas || [];

    const dataCorreta = dataBusca
      ? reservas.some((reserva) => formatDate(reserva.data) === dataBusca)
      : true;

    const horarioCorreto = horarioBusca
      ? reservas.some(
          (reserva) =>
            reserva.horario_inicio <= horarioBusca && reserva.horario_fim >= horarioBusca
        )
      : true;
  
    const numeroCorreto = sala.numero.toString().includes(busca.trim());
  
    return dataCorreta && horarioCorreto && numeroCorreto;
  });

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
         <img
        src={logosenai}
        alt="Logo do Senai"
        style={{
          width: "200px",
          height: "auto",
         
        }}
      />
      <h1 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "bold" }}>
            Salas disponíveis
          </h1>
      {salas.length === 0 ? (
        <p>Carregando Salas...</p>
      ) : (
        <Box
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: "10px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            padding: "20px",
            width: "100%",
            maxWidth: 1200,
            textAlign: "center",
          }}
        >
          

          {/* Campo de busca com ícone */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            <TextField
              label="Buscar sala por identificação"
              variant="outlined"
              size="small"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ backgroundColor: "#fff", borderRadius: "5px", width: "80%" }}
            />
            {/* icone de perfil */}
           <PersonOutlineIcon
          sx={{ marginLeft: "10px", fontSize: 30, cursor: "pointer", color: "black" }}
         onClick={() => navigate("/perfil", { state: { idUser } })}
          />

          </Box>

          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#D9D9D9",
              boxShadow: "none",
              width: "90%",
              maxWidth: 1500,
            }}
          >
            <Table>
              <TableBody>
                {salasFiltradas.length > 0 ? (
                  salasFiltradas.map((sala) => (
                    <TableRow
                      key={sala.id_sala}
                      onClick={() => handleRowClick(sala)}
                      style={{ cursor: "pointer" }}
                      sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                        margin: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50px",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "none",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {sala.numero}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center">Nenhuma sala encontrada</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            fullWidth
            variant="contained"
            onClick={logout}
            style={{
              backgroundColor: "#b20000",
              color: "white",
              fontWeight: "bold",
              marginTop: 20,
              borderRadius: "8px",
            }}
          >
            Sair
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ListSalas;