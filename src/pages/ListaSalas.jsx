import { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

function ListSalas() {
  const [salas, setSalas] = useState([]);
  const navigate = useNavigate();

  // Busca as salas da API
  async function getSalas() {
    try {
      const response = await api.getSala(); // deve ser algo tipo api.get("/salas")
      setSalas(response.data.sala);
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  }

  // Quando clica em uma linha, vai para a descrição da sala
  const handleRowClick = (sala) => {
    navigate("/descricao", { state: { sala } });
  };

  // Logout
  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    getSalas();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
      {salas.length === 0 ? (
        <p>Carregando Salas...</p>
      ) : (
        <div
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
          <h1 style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "bold" }}>
            Salas disponíveis
          </h1>

          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#D9D9D9",
              boxShadow: "none",
              width: "90%",
              maxWidth: 800,
            }}
          >
            <Table>
              <TableBody>
                {salas.map((sala) => (
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
                ))}
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
            sair
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListSalas;
