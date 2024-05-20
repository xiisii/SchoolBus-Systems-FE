import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CardTableConfig } from "src/components/card-table";
import { SaleShiftDetail } from "src/types/sale-shift";
import {
  AutoTransaction,
  AutoTransactionDetail,
} from "src/types/transaction-auto";

const autoTransactionTableConfigs: CardTableConfig<
  AutoTransactionDetail["id"],
  AutoTransactionDetail
>[] = [
  {
    key: "type",
    headerLabel: "Vòi",
    type: "string",
    renderCell: (item) => {
      return <Typography>{item.type}</Typography>;
    },
  },
  {
    key: "fuel",
    headerLabel: "Nhiên liệu",
    type: "string",
  },
  {
    key: "num_staff",
    headerLabel: "Lít",
    type: "string",
  },
  {
    key: "price",
    headerLabel: "Giá",
    type: "string",
  },
  {
    key: "total",
    headerLabel: "Thành tiền",
    type: "string",
  },

  {
    key: "start_time",
    headerLabel: "Loại GD",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "Số xe",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "P.Thức T.Toán",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "K.Hàng",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "Số ĐT",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "Thời gian",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "Số GD",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "Mã hóa đơn",
    type: "string",
  },
];

export default autoTransactionTableConfigs;
