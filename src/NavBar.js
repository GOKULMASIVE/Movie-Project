import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Typography from '@mui/material/Typography';
import { useContext } from "react";
import {crtContext} from './App.js';
export const NavBar = () => {
  const navigate = useNavigate();
  let[mode,setMode]=useContext(crtContext);
  return (
    <Box sx={{ flexGrow: 1 }} className="Box-menu">
      <AppBar position="static">
        <Toolbar>
        <Typography sx={{flexGrow:1}}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/movies")}>
            Movies
          </Button>
          <Button color="inherit" onClick={() => navigate("/add-movies")}>
            Add Movie
          </Button>
          <Button color="inherit" onClick={() => navigate("/colors")}>
            color game
          </Button>
        </Typography>
          <Button
            color="inherit"
            startIcon={mode==="light" ? <DarkModeIcon /> : <WbSunnyIcon />}
            onClick={() => setMode(mode==="light"?"dark" :"light")}
          >
            {mode==="dark"?"light":"dark"} mode
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
