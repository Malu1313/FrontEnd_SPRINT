import axios from "axios"

const api = axios.create({
    baseURL:"http://10.89.240.68:3000/projeto_senai/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:()=>api.post("/usuario", user),
    postLogin:()=>api.post("/login", user),
    getSala:()=>api.get("/sala")
}

export default sheets;