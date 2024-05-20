import * as yup from "yup";

export interface Pump {
  id: string;
  status: string;
  name: string;
  unit: string;
  price: string;
  into_money: string;
  fuel: string;
  port: string;
  description: string;
  address: string;
}

export interface PumpDetail extends Pump {}

export const PumpSchema = yup.object().shape({
  status: yup.string().required("Vui lòng nhập status"),
  name: yup.string().required("Vui lòng nhập name"),
  port: yup.string().required("Vui lòng nhập port"),
  description: yup.string().required("Vui lòng nhập description"),
  address: yup.string().required("Vui lòng nhập address"),
});

export const initialPump: PumpDetail = {
  id: "0",
  status: "",
  name: "",
  unit: "",
  price: "",
  into_money: "",
  fuel: "",
  port: "",
  description: "",
  address: "",
};
