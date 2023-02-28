import React from "react";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  let user = JSON.parse(sessionStorage.getItem('token'));
  const loginname = user.userId;
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6"
          component="div" sx={{ flexGrow: 1 }}>
          <h2> <EventNoteIcon />Keeper </h2>
        </Typography>
        <Button color="inherit"> <AccountCircleIcon /><p> {loginname}</p></Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
