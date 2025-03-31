import { useState, useEffect } from 'react'
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
import api from '../axios/axios'
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';

function ListSalas() {
  const [sala ,setSala] = useState([]);
  const navigate = useNavigate();

  async function getSalas(){
    // Chamada da Api
    await api.getSalas().then(
      (response)=>{
        console.log(response.data.sala)
        setSala(response.data.sala)
      },(error)=>{
        console.log("Erro ",error)
      }
    )
  }

  const ListSalas = sala.map((sala)=>{
    return(
      <TableRow key={sala.id_sala}>
        <TableCell align="center">{numero}</TableCell>
        <TableCell align="center">{capacidade}</TableCell>
        <TableCell align="center">{descricao}</TableCell>
      </TableRow>
    )
  })

  function logout(){
  localStorage.removeItem("authenticated");
  navigate("/")
  }

  useEffect(()=>{
    getSalas();
  },[]);


  return (
    <div>
      {sala.length == 0 ? (
        <p>Carregando Salas</p>
      ) : (
        <div>
          <h5>Salas disponiveis</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "#FFC2D1", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Numero</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Capacidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{ListSalas}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout} sx={{ backgroundColor: "red" }}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}
export default ListSalas;
