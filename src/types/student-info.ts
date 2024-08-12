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
  id: yup.string().required("Vui lòng nhập studentid"),
  name: yup.string().required("Vui lòng nhập name"),
  locate: yup.string().required("Vui lòng nhập vị trí (LAT_LNG)"),
  bus: yup.string().required("Vui lòng nhập chuyến xe"),
});

export const initialStudentInfo: StudentInfoDetail = {
  id: "",
  locate: "",
  status: "",
  name: "",
  bus: "",
};
