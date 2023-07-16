import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password is not valid")
    .required(),
});
