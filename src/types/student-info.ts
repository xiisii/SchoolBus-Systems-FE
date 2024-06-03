import * as yup from "yup";

export interface StudentInfo {
  id: string;
  name: string;
  locate: string;
  status: string;
  bus: string;
}

export interface StudentInfoDetail extends StudentInfo {}

export const studentInfoSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập name"),
  locate: yup.string().required("Vui lòng nhập vị trí (LAT_LNG)"),
  status: yup.string().required("Vui lòng nhập status"),
});

export const initialStudentInfo: StudentInfoDetail = {
  id: "0",
  locate: "",
  status: "",
  name: "",
  bus: "",
};
