import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import logo from "./logo.jpeg";

function MainHeader() {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#002532" }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ width: "100px", height: "auto", marginRight: "20px" }} />
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Rice Mill Management System
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainHeader;