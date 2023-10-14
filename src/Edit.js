import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { crtContext } from "./App";

function Loading(){
    return<h1>Loading.....</h1>
}
const Edit = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`https://6522de36f43b17938414fce3.mockapi.io/movies/${id}`)
      .then((data) => data.json())
      .then((mvs) => setMovie(mvs));
  }, []);

  return movie ? <EditMovie movie={movie} /> : <Loading/>;
};
const EditMovie = ({ movie }) => {
    const getMovie=useContext(crtContext)
  const formValidation = yup.object({
    name: yup.string().required("Why not fill this name?😄"),
    poster: yup
      .string()
      .min(4, "Need a longer poster😁")
      .required("Why not fill this poster?😄"),
    rating: yup
      .number()
      .min(0, "Need a bigger rating😁")
      .max(10, "Too much rating😅")
      .required("Why not fill this rating?😄"),
    summary: yup
      .string()
      .min(20, "Need a longer summary😁")
      .required("Why not fill this summary?😄"),
    trailer: yup
      .string()
      .min(4, "Need a longer trailer😁")
      .required("Why not fill this trailer?😄"),
  });
    const { id } = useParams();
    const navigate=useNavigate()
  function updateMovie(updatedMovie){
      fetch(`https://6522de36f43b17938414fce3.mockapi.io/movies/${id}`, {
          method: "PUT",
          body: JSON.stringify(updatedMovie),
          headers:{
            "Content-Type":"application/json",
          }
      })
          .then((data) => data.json())
          .then(()=>getMovie())
          .then(()=>navigate("/movies"))
    }
  const { handleBlur, values, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: movie.name,
        poster:movie.poster,
        rating:movie.rating,
        summary:movie.summary,
        trailer:movie.trailer,
      },
      validationSchema: formValidation,
      onSubmit: (values) => {
        updateMovie(values)
      },
    });


  return (
    <section className="add-movies">
    
      <form className="addMovie" onSubmit={handleSubmit}>
        <TextField
        //   id="outlined-basic"
          label="Name"
          variant="outlined"
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          helperText={touched.name && errors.name ? errors.name : null}
        />

        <TextField
        //   id="outlined-basic"
          label="Poster"
          variant="outlined"
          value={values.poster}
          name="poster"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.poster && errors.poster}
          helperText={touched.poster && errors.poster ? errors.poster : null}
        />

        <TextField
        //   id="outlined-basic"
          label="Rating"
          variant="outlined"
          value={values.rating}
          name="rating"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.rating && errors.rating}
          helperText={touched.rating && errors.rating ? errors.rating : null}
        />

        <TextField
        //   id="outlined-basic"
          label="Summary"
          variant="outlined"
          value={values.summary}
          name="summary"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.summary && errors.summary}
          helperText={touched.summary && errors.summary ? errors.summary : null}
        />

        <TextField
        //   id="outlined-basic"
          label="Trailer"
          variant="outlined"
          value={values.trailer}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.trailer && errors.trailer}
          helperText={touched.trailer && errors.trailer ? errors.trailer : null}
        />
        <Button
          variant="contained"
          type="submit"
          color={"success"}
          sx={{ fontWeight: "900" }}
        >
          Save
        </Button>
      </form>
    </section>
  );
};
export default Edit;
