import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Sala from "./pages/Salas";
import DefaultLayout from "./components/DefaultLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
        <Route path="/sala" 
        element={
          <ProtectedRoutes>
        <Sala />
        </ProtectedRoutes>
        } />
      </Routes>
    </Router>
  );
}

export default App;
