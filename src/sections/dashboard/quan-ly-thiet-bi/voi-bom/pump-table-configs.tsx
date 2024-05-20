import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CardTableConfig } from "src/components/card-table";
import { PumpDetail } from "src/types/pumps";

const pumpTableConfigs: CardTableConfig<PumpDetail["id"], PumpDetail>[] = [
  {
    key: "name",
    headerLabel: "Tên vòi bơm",
    type: "string",
    renderCell: (item) => {
      return <Typography>{item.name}</Typography>;
    },
  },

  {
    key: "employee",
    headerLabel: "Sử dụng thiết bị",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "Mô tả",
    type: "string",
  },
  {
    key: "employee",
    headerLabel: "Trạng thái",
    type: "string",
  },
];

export default pumpTableConfigs;
