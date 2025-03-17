import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:()=>api.post("/cadastro"),
    postLogin:()=>api.post("/login"),
    getSala:()=>api.get("/sala")
}

export default sheets;