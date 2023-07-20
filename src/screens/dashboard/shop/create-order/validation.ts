import * as yup from "yup";

export const createOrderValidationSchema = yup.object({
  amount: yup.number().min(0).required(),
  address: yup.string().required(),
  contactName: yup.string().required(),
  deliveryPeriod: yup.date().required(),
  contactNumber: yup
    .string()
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Phone number is not valid")
    .required(),
  extraInfo: yup.string(),
});
