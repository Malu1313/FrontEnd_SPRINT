import { useState, useEffect } from 'react';
// Imports para criação de tabela
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
// TableHead é onde colocamos os titulos
import TableHead from '@mui/material/TableHead';
// TableBody é onde colocamos o conteúdo
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import api from '../axios/axios';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function ListSala() {
  const [sala, setSala] = useState([]);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  async function getSala() {
    // Chamada da Api
    await api.getSala().then(
      (response) => {
        console.log(response.data.sala);
        setSala(response.data.sala);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  const Sala = users.map((sala) => {
    return (
      <TableRow key={sala.id_sala}>
        <TableCell align="center">{sala.numero}</TableCell>
        <TableCell align="center">{sala.descricao}</TableCell>
        <TableCell align="center">{sala.capacidade}</TableCell>
      </TableRow>
    );
  });

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/login");
  }

  useEffect(() => {
    setAuth(localStorage.getItem("authenticated"));
    getSala(); 
  }, []);

  return (
    <div>
      {sala.length === 0 ? (
        <p>Carregando Salas...</p>
      ) : (
        <div>
          <h5>Lista de Salas Disponíveis</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#E7C6FF", borderStyle: "solid" }}>
                <TableRow>
                  <TableCell align="center">Número</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Capacidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{Sala}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListSala;
