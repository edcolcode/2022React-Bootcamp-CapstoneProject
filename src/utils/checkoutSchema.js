import * as yup from "yup";

const checkoutSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    post: yup.string().min(5).required(),
    notes: yup.string(),
}).required();

export default checkoutSchema;