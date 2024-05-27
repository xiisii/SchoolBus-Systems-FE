import * as yup from "yup";

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  car: string;
  status: string;
}

export interface DriverInfoDetail extends DriverInfo {}

export const driverInfoSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập name"),
  phone: yup.string().required("Vui lòng nhập phone"),
  car: yup.string().required("Vui lòng nhập car"),
  status: yup.string().required("Vui lòng nhập status"),
});

export const initialDriverInfo: DriverInfoDetail = {
  id: "0",
  phone: "",
  car: "",
  status: "",
  name: "",
};
