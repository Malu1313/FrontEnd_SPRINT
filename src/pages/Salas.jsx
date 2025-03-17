import { useState, useEffect } from "react";// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';

function listSala() {
  const [events, setSala] = useState([]);

  async function getSala() {
    //Chamada da Api
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

  const listEventos = sala.map((evento) => {
    return (
      <TableRow key={sala.id_sala}>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    getEventos();
  }, []);

  return (
    <div>
      <h1>Lista de eventos</h1>
      <TableContainer component={Paper} style={{ margin: "10px" }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: "orange", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Data_hora</TableCell>
              <TableCell align="center">Local</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{listSala}</TableBody>
        </Table>
      </TableContainer>
  
    </div>
  );
}

export default listSala;
