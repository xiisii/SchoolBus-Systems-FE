import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CardTableConfig } from "src/components/card-table";
import { PumpCylinderDetail } from "src/types/pump-cylinder";

const pumpCylinderTableConfigs: CardTableConfig<
  PumpCylinderDetail["id"],
  PumpCylinderDetail
>[] = [
  {
    key: "name",
    headerLabel: "Tên trụ bơm",
    type: "string",
    renderCell: (item) => {
      return <Typography>{item.name}</Typography>;
    },
  },
  {
    key: "fuel",
    headerLabel: "Sử dụng thiết bị",
    type: "string",
  },
  // {
  //   key: "num_staff",
  //   headerLabel: "Phân bố CHXD",
  //   type: "string",
  // },
  {
    key: "price",
    headerLabel: "Mô tả",
    type: "string",
  },
  {
    key: "total",
    headerLabel: "Trạng thái",
    type: "string",
  },
];

export default pumpCylinderTableConfigs;
