import * as yup from "yup";

export interface TransactionManagement {
  id: string;
  type: string;
  sold_time: Date;
  discount: string;
  pump_id: string;
  pump_cylinder_id: string;
  vat: string;
}

export interface TransactionManagementDetail extends TransactionManagement {}

export const autoTransactionSchema = yup.object().shape({
  type: yup.string().required("Vui lòng nhập start_time"),
  sold_time: yup.date().required("Vui lòng nhập sold_time"),
  end_time: yup.string().required("Vui lòng nhập end_time"),
  discount: yup.string().required("Vui lòng nhập discount"),
  pump_id: yup.string().required("Vui lòng nhập pump_id"),
  pump_cylinder_id: yup.string().required("Vui lòng nhập pump_cylinder_id"),
  vat: yup.string().required("Vui lòng nhập vat"),
});

export const initialTransactionManagement: TransactionManagement = {
  id: "0",
  type: "",
  sold_time: new Date(),
  pump_id: "",
  pump_cylinder_id: "",
  discount: "",
  vat: "",
};
