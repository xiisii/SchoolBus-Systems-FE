import * as yup from "yup";

export interface PumpCylinder {
  id: string;
  status: string;
  name: string;
  port: string;
  description: string;
  address: string;
}

export interface PumpCylinderDetail extends PumpCylinder {}

export const PumpCylinderSchema = yup.object().shape({
  status: yup.string().required("Vui lòng nhập status"),
  name: yup.string().required("Vui lòng nhập name"),
  port: yup.string().required("Vui lòng nhập port"),
  description: yup.string().required("Vui lòng nhập description"),
  address: yup.string().required("Vui lòng nhập address"),
});

export const initialPumpCylinder: PumpCylinderDetail = {
  id: "0",
  status: "",
  name: "",
  port: "",
  description: "",
  address: "",
};
