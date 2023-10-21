import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState, useEffect } from "react";
import { API } from "./API.js";
export const Trailer = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((data) => data.json())
      .then((mvs) => setMovie(mvs));
  }, []);

  const navigate = useNavigate();
  const trail = movie;
  return (
    <section>
      <iframe
        width="100%"
        height="700"
        src={trail.trailer}
        title={trail.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="movie-details-container">
        <div className="movie-specs">
          <h2>{trail.name}</h2>
          <p
            className="movie-rating"
            style={{ color: trail.rating <= 8.4 ? "red" : "green" }}
          >
            ⭐{trail.rating}
          </p>
        </div>
        <p className="movie-summary">{trail.summary}</p>
      </div>
      <Button
        variant="contained"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </section>
  );
};
