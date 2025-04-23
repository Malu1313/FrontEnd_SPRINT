import axios from "axios"

const api = axios.create({
    baseURL:"http://10.89.240.71:5000/projeto_senai/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:(usuario)=>api.post("/usuario", usuario),
    postLogin:(usuario)=>api.post("/login", usuario),
    getSala:()=>api.get("/salas")
}

export default sheets;