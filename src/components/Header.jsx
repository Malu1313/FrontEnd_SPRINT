import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import logosenai from "../assets/logo-senai.png";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#B30E0A",
        height: "45px",
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ minHeight: "45px !important", px: 2 }}>
        <Box>
          <img
            src={logosenai}
            alt="Logo do Senai"
            style={{ width: "120px", height: "auto" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
