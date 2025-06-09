import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DefaultLayout from "./components/DefaultLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ListSalas from "./pages/ListaSalas";
import SalaDetalhes from "./pages/Descricao";
import Reservar from "./pages/Calendario"; // Já tá certo o nome
import Perfil from "./pages/Perfil";
import Minhas_Reservas from "./pages/Minhas_Reservas";


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          }
        />
        <Route
          path="/cadastro"
          element={
            <DefaultLayout>
              <Cadastro />
            </DefaultLayout>
          }
        />
        <Route
          path="/salas"
          element={
            <ProtectedRoutes>
              <ListSalas />
            </ProtectedRoutes>
          }
        />
          <Route
          path="/MinhasReservas"
          element={
            <ProtectedRoutes>
              <Minhas_Reservas />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoutes>
              <Perfil/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/descricao"
          element={
            <ProtectedRoutes>
              <SalaDetalhes />
            </ProtectedRoutes>
          }
        />
        
        
        <Route
          path="/calendario"
          element={
            <ProtectedRoutes>
              <Reservar />
            </ProtectedRoutes>
          }
        />
        
       

      </Routes>
    </Router>
  );
}

export default App;
