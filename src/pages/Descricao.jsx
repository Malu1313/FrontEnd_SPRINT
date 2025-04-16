import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import { Button } from "@mui/material";

function SalaDetalhes() {
    const { state } = useLocation();
  const navigate = useNavigate();
  const [sala, setSala] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const idSala = state?.sala?.id_sala;

    if (!idSala) {
      setError("Sala não informada.");
      setLoading(false);
      return;
    }

    const fetchSalaDetails = async () => {
      try {
        const response = await api.get(`/sala/${idSala}`);
        console.log("Detalhes da sala:", response.data.sala);
        setSala(response.data.sala);
      } catch (err) {
        console.error("Erro ao buscar detalhes da sala:", err);
        setError("Erro ao carregar os detalhes da sala.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalaDetails();
  }, [state]);

  if (loading) return <p>Carregando detalhes da sala...</p>;
  if (error) return <p>{error}</p>;

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
      <div
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: "10px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          padding: "20px",
          width: "90%",
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Detalhes da Sala</h2>
        <p><strong>Número:</strong> {sala.numero}</p>
        <p><strong>Descrição:</strong> {sala.descricao}</p>

        <Button
          variant="contained"
          onClick={() => navigate("/salas")}
          style={{
            marginTop: 20,
            backgroundColor: "#1976d2",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default SalaDetalhes;
