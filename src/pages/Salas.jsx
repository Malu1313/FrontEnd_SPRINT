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
          >
           <h1 style={{textAlign:"center"}}
           
           >Salas Disponíveis</h1>
          </div>
          
          <TableContainer //cria uma tabela
            component={Paper}
            sx={{
              marginTop: 4,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#D9D9D9",
              
              textAlign:"center"
            }}
          >
            <Table sx={{minWidth: 250}}>
            <TableHead
                sx={{ backgroundColor: "#D9D9D9", fontWeight:"bold", }}
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
          <Button //estilização botão sair - logout
            fullWidth
            variant="contained"
            onClick={logout}
            style={{
              backgroundColor: "#d40000",
              color: "white",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            SAIR
          </Button>
      /
              
            
          
        </div>
      )}
      
    </div>
  );
}

export default ListSalas;
