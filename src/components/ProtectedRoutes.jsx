import {Navigate} from "react-router-dom";

const ProtectedRoutes= ({children}) =>{
    const isAuthenticated= localStorage.getItem("authenticated");
    return isAuthenticated ? children : <Navigate to ="/" />;
};

export default ProtectedRoutes;