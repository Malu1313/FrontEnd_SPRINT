import axios from "axios"

const api = axios.create({
    baseURL:"http://10.89.240.84:3000/projeto_senai/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:(usuario)=>api.post("/usuario", usuario),
    postLogin:(usuario)=>api.post("/login", usuario),
    getSala:()=>api.get("/salas"),
    postReserva: (reserva) => api.post("/reserva", reserva),
    getAllReservasPorSala: (id_sala) => api.get(`/reservas/${id_sala}`),
    getUsuario: (id_usuario) => api.get(`/usuario/${id_usuario}`)
};

export default sheets;