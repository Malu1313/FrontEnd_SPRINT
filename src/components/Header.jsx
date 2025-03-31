import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#B30E0A", width: "100%",
    height: "45px" }}>
      {/*<Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/*<IconButton
          color="inherit"
          onClick={() => {
            console.log("Cliquei");
          }}
        >*/}
          
        
      
    </AppBar>
  );
};

export default Header;
