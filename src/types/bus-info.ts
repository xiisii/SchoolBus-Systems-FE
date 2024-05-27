import * as yup from "yup";

export interface BusInfo {
  id: string;
  name: string;
  status: string;
}

export interface BusInfoDetail extends BusInfo {}

export const BusInfoSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập name"),
  status: yup.string().required("Vui lòng nhập status"),
});

export const initialBusInfo: BusInfoDetail = {
  id: "0",
  status: "",
  name: "",
};
