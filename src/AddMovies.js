import {API} from './API.js'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function AddMovie({ getMovie }) {
  const navigate = useNavigate();

  const validationForm = yup.object({
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

  const { handleBlur, handleSubmit, handleChange, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        poster: "",
        rating: "",
        summary: "",
        trailer: "",
      },
      validationSchema: validationForm,
      onSubmit: (values) => {
        InsertMovie(values);
      },
    });
  const InsertMovie = (newMovie) => {
    fetch(`${API}/movies`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate("/movies"))
      .then(() => getMovie())

      .catch(() => navigate("*"));
  };
  return (
    <section className="add-movies">
      <form className="addMovie" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          helperText={touched.name && errors.name ? errors.name : null}
        />

        <TextField
          id="outlined-basic"
          label="Poster"
          variant="outlined"
          name="poster"
          value={values.poster}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.poster && errors.poster}
          helperText={touched.poster && errors.poster ? errors.poster : null}
        />

        <TextField
          id="outlined-basic"
          label="Rating"
          variant="outlined"
          name="rating"
          value={values.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.rating && errors.rating}
          helperText={touched.rating && errors.rating ? errors.rating : null}
        />

        <TextField
          id="outlined-basic"
          label="Summary"
          variant="outlined"
          name="summary"
          value={values.summary}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.summary && errors.summary}
          helperText={touched.summary && errors.summary ? errors.summary : null}
        />

        <TextField
          id="outlined-basic"
          label="Trailer"
          variant="outlined"
          name="trailer"
          value={values.trailer}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.trailer && errors.trailer}
          helperText={touched.trailer && errors.trailer ? errors.trailer : null}
        />

        <Button variant="contained" type="submit">
          Add movie
        </Button>
      </form>
    </section>
  );
}

export default AddMovie;
