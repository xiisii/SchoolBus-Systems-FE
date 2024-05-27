import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PiGitForkBold } from "react-icons/pi";
import { CardTableConfig } from "src/components/card-table";
import { BusInfoDetail } from "src/types/bus-info";

const busInfoTableConfigs: CardTableConfig<
  BusInfoDetail["id"],
  BusInfoDetail
>[] = [
  {
    key: "id",
    headerLabel: "Id",
    type: "string",
  },
  {
    key: "name",
    headerLabel: "Tên",
    type: "string",
  },
  {
    key: "status",
    headerLabel: "Trạng thái",
    type: "string",
  },
];

export default busInfoTableConfigs;
