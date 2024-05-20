import * as yup from "yup";

export interface SaleShift {
  id: string;
  start_time: string;
  end_time: string;
  employee: string;
  pump_id: string;
  name: string;
}

export interface SaleShiftDetail extends SaleShift {}

export const saleShiftSchema = yup.object().shape({
  start_time: yup.string().required("Vui lòng nhập start_time"),
  end_time: yup.string().required("Vui lòng nhập end_time"),
  employee: yup.string().required("Vui lòng nhập employee"),
  pump_id: yup.string().required("Vui lòng nhập pump_id"),
  name: yup.string().required("Vui lòng nhập name"),
});

export const initialSaleShift: SaleShiftDetail = {
  id: "0",
  start_time: "",
  end_time: "",
  pump_id: "",
  employee: "",
  name: "",
};
