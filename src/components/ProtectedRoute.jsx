import {Navigate} from "react-router-dom";

const ProtectedRoute= ({childrean}) =>{
    const isAuthenticated= localStorage.getItem("authenticated");
    return isAuthenticated ? childrean : <Navigate to ="/Cadastro" />;
    
};

export default ProtectedRoute;