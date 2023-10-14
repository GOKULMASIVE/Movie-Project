import { useFormik } from "formik";
import * as yup from "yup";

const formValidation = yup.object({
  email: yup
    .string()
    .min(8, "Need a longer email")
    .required("why not fill this email"),
  password: yup.string().min(8).max(10).required("Why not fill this password"),
});
const BasicForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidation,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        type="email"
        value={formik.values.email}
        placeholder="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email ? formik.errors.email:null}
      <input
        type="text"
        name="password"
        value={formik.values.password}
        placeholder="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.password && formik.touched.password?formik.errors.password:null}
      <button type="submit">Submit</button>
      {/* Error
      <pre>{JSON.stringify(formik.errors)}</pre>
      Touched
      <pre>{JSON.stringify(formik.touched)}</pre> */}
    </form>
  );
};
export default BasicForm;
