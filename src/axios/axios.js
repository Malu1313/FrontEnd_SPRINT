import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.84:3000/projeto_senai/",
  headers: {
    accept: "application/json",
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token: ", token);
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postCadastro: (usuario) => api.post("/usuario", usuario),
  postLogin: (usuario) => api.post("/login", usuario),
  getSala: () => api.get("/salas"),
  postReserva: (reserva) => api.post("/reserva", reserva),
  getAllReservasPorSala: (id_sala) => api.get(`/reservas/${id_sala}`),
  getUsuario: (id_usuario) => api.get(`/usuario/${id_usuario}`),
  getReservasPorUsuario: (id_usuario) => api.get(`/reservas/usuario/${id_usuario}`),
  deleteReserva: (id_reserva) => api.delete(`/reserva/${id_reserva}`),
  deleteUser: (id_usuario) => api.delete(`/usuario/${id_usuario}`),
  putUsuario: (id_usuario, usuario) => api.put(`/usuario/${id_usuario}`, usuario),
};

export default sheets;
