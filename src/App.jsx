import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DefaultLayout from "./components/DefaultLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ListSalas from "./pages/Salas";
import Footer from "./components/Footer";

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
        <Route path="/salas" 
        element={
          <ProtectedRoutes>
           
        <ListSalas />
        
        
        </ProtectedRoutes>
        } />
      </Routes>
    </Router>
  );
}

export default App;
