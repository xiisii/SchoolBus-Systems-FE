import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CardTableConfig } from "src/components/card-table";
import { SaleShiftDetail } from "src/types/sale-shift";

const saleShiftTableConfigs: CardTableConfig<
  SaleShiftDetail["id"],
  SaleShiftDetail
>[] = [
  {
    key: "name",
    headerLabel: "Vòi/HHK",
    type: "string",
    renderCell: (item) => {
      return <Typography>{item.name}</Typography>;
    },
  },
  {
    key: "fuel",
    headerLabel: "Nhiên liệu",
    type: "string",
  },
  {
    key: "num_staff",
    headerLabel: "Tổng lít",
    type: "string",
  },
  {
    key: "price",
    headerLabel: "Giá",
    type: "string",
  },
  {
    key: "total",
    headerLabel: "Tổng tiền",
    type: "string",
  },
  {
    key: "price",
    headerLabel: "Bán lẻ",
    type: "string",
  },
  {
    key: "start_time",
    headerLabel: "Thời gian mở ca",
    type: "string",
  },
  // {
  //   key: "employee",
  //   headerLabel: "Nhân viên",
  //   type: "string",
  // },
];

export default saleShiftTableConfigs;
