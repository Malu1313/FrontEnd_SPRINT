import {Navigate} from "react-router-dom";

const ProtectedRoutes= ({childrean}) =>{
    const isAuthenticated= localStorage.getItem("authenticated");
    return isAuthenticated ? childrean : <Navigate to ="/" />;
};

export default ProtectedRoutes;