import * as yup from "yup";

export interface BusInfo {
  id: string;
  name: string;
  status: string;
  updated_time: string;
  bus: string;
  locate: string;
}

export interface BusInfoDetail extends BusInfo {}

export const BusInfoSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập name"),
  status: yup.string().required("Vui lòng nhập status"),
  updated_time: yup.string().required("Vui lòng nhập updated_time"),
  bus: yup.string().required("Vui lòng nhập bus"),
  locate: yup.string().required("Vui lòng nhập locate"),
});

export const initialBusInfo: BusInfoDetail = {
  id: "0",
  status: "",
  name: "",
  updated_time: "",
  bus: "",
  locate: "",
};
