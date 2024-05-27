import * as yup from "yup";

export interface StudentInfo {
  id: string;
  name: string;
  lang: string;
  lot: string;
  status: string;
}

export interface StudentInfoDetail extends StudentInfo {}

export const studentInfoSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập name"),
  lang: yup.string().required("Vui lòng nhập lang"),
  lot: yup.string().required("Vui lòng nhập lot"),
  status: yup.string().required("Vui lòng nhập status"),
});

export const initialStudentInfo: StudentInfoDetail = {
  id: "0",
  lang: "",
  lot: "",
  status: "",
  name: "",
};
