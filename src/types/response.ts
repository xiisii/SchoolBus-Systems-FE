import * as yup from "yup";

export interface Response {
  error: number;
  message: string;
  data: object;
}

export interface ResponseDetail extends Response {}

export const initialResponse: ResponseDetail = {
  error: 0,
  message: "",
  data: {},
};
