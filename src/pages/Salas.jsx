import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import setaImage from "../assets/seta.png"; // Importando a imagem da seta

function ListSalas() {
  const [salas, setSalas] = useState([]);
  const navigate = useNavigate();

  // Função para buscar as salas
  async function getSalas() {
    try {
      const response = await api.getSala();
      console.log(response.data);
      setSalas(response.data.sala);
    } catch (error) {
      console.log("Erro", error);
    }
  }

  // Função de logout
  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/"); // Redireciona para a página inicial
  }

  useEffect(() => {
    getSalas();
  }, []); // Executa apenas uma vez quando o componente é montado

  return (
    <div>
      {salas.length === 0 ? (
        <p>Carregando Salas...</p> // Mensagem de carregamento
      ) : (
        <div>
          <div
            style={{
              display: "flex", // Define que o contêiner será flexível
              justifyContent: "center", // Centraliza o conteúdo horizontalmente
              alignItems: "center", // Centraliza o conteúdo verticalmente
              fontWeight:"bold"
            }}
          >
           <h1>Salas Disponíveis</h1>
          </div>
          
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="xs">
              <TableHead
                style={{ backgroundColor: "#D9D9D9", borderStyle: "solid" }}
              ></TableHead>

              <TableBody>
                {salas.map((sala) => (
                  <TableRow key={sala.id_sala}>
                    <TableCell align="center">{sala.numero}</TableCell>
                    <TableCell align="center">{sala.descricao}</TableCell>
                    <TableCell align="center">{sala.capacidade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
       <img
        src={setaImage}
        alt="Seta de Logout"
        onClick={logout} // Ação de logout
        style={{
          position: "fixed", // Fixa a seta na tela
          bottom: "70px", // Distância da parte inferior da tela, acima do footer
          left: "20px", // Distância da parte esquerda da tela
          width: "40px", // Tamanho da seta
          cursor: "pointer", // Muda o cursor para a mãozinha ao passar sobre a seta
         
        }}
      />
    </div>
  );
}

export default ListSalas;
