import * as yup from "yup";

const schema = yup.object().shape({
  fname: yup.string().required("This field is required."),
  lname: yup.string(),
  email: yup.string().email("This field is required."),
  password: yup.string().min(6).required("This field is required."),
  passwordConfirmation: yup
    .string()
    .required("This field is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  createdAt: yup.date().default(function () {
    return new Date();
  }),
});
export default schema;
