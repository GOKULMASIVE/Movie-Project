import { createContext, useEffect, useState } from "react";
import Movie from "./Movie.js";
import AddMovie from "./AddMovies.js";
import ColorComponent from "./Colors.js";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./Home.js";
import { NotFound } from "./NotFound.js";
import { Trailer } from "./Trailer.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NavBar } from "./NavBar.js";
import Paper from "@mui/material/Paper";
import data from "./data.js";
import Edit from "./Edit.js";
import BasicForm from "./BasicForm.js";
export const crtContext = createContext();
function App() {
  const [addMovie, setAddMovie] = useState([]);

  const getMovies = () => {
    fetch("https://6522de36f43b17938414fce3.mockapi.io/movies")
      .then((data) => data.json())
      .then((mvs) => setAddMovie(mvs));
  };

  useEffect(() => getMovies(), []);

  
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ minHeight: "100vh", borderRadious: "0px" }} elevation={3}>
        <>
          <crtContext.Provider value={[mode, setMode]}>
            <NavBar />
          </crtContext.Provider>

          <section className="router-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/movies"
                element={
                  <Movie
                    addMovies={addMovie}
                    getMovie={getMovies}
                  />
                }
              />
              <Route
                path="/add-movies"
                element={<AddMovie getMovie={getMovies}/>}
              />
              <Route
                path="colors"
                element={<Navigate replace to="/add-colors" />}
              />
              <Route path="/add-colors" element={<ColorComponent />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/movies/trailer/:id" element={<Trailer />} />
              <Route path="/movies/edit/:id" element={
              <crtContext.Provider value={getMovies}><Edit /></crtContext.Provider>} />

            </Routes>
          </section>
        </>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
