import * as yup from "yup";

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  password: string;
  code: string;
  company: string;
  tax: string;
  role: string;
  phone: string;
  address: string;
}

export interface UserDetail extends User {}

export const userSchema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập username"),
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập username"),
  name: yup.string().required("Vui lòng nhập name"),
  password: yup.string().required("Vui lòng nhập password"),
  code: yup.string().required("Vui lòng nhập code"),
  company: yup.string().required("Vui lòng nhập company"),
  tax: yup.string().required("Vui lòng nhập tax"),
  // role: yup.string().required("Vui lòng nhập role"),
});

export const initialUser: UserDetail = {
  id: 0,
  username: "",
  email: "",
  name: "",
  password: "",
  role: "",
  code: "",
  company: "",
  tax: "",
  phone: "",
  address: "",
};
