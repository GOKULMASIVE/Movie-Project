import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { API } from "./API.js";
import { useNavigate } from "react-router-dom";
import { Counter } from "./Counter";
import { Typography } from "@mui/material";


function Movie({ addMovies, getMovie }) {
  // console.log(addMovies);

  let [arrow, setArrow] = useState(true);
  const navigate = useNavigate();
  const deleteMovie = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => getMovie());
  };
  return (
    <section className="movie-list-container">
      {addMovies.map((movie) => {
        return (
          <Card key={movie.id} className="movie-container">
            <img src={movie.poster} alt={movie.name} className="movie-poster" />
            <CardContent>
              <div className="movie-specs">
                <div className="icon-container">
                  <h2 className="movie-name">{movie.name}</h2>
                  <span className="span">
                    <IconButton
                      aria-label="toggle"
                      color="primary"
                      onClick={() => setArrow(!arrow)}
                    >
                      {arrow ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowUpIcon />
                      )}
                    </IconButton>
                    <InfoIcon
                      color="primary"
                      className="error-icon"
                      aria-label="information"
                      onClick={() => navigate(`/movies/trailer/${movie.id}`)}
                    />
                  </span>
                </div>

                <p
                  className="movie-rating"
                  style={{ color: movie.rating <= 8.4 ? "red" : "green" }}
                >
                  ⭐{movie.rating}
                </p>
              </div>

              <p
                className="movie-summary"
                style={arrow ? { display: "block" } : { display: "none" }}
              >
                {movie.summary}
              </p>
            </CardContent>
            <CardActions>
              <Typography sx={{ flexGrow: 1 }}>
                <Counter />
              </Typography>

              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => navigate(`/movies/edit/${movie.id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => deleteMovie(movie.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </section>
  );
}

export default Movie;
