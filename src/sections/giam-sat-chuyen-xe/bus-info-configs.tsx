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
    key: "bus",
    headerLabel: "Chuyến xe",
    type: "string",
  },
  {
    key: "locate",
    headerLabel: "Vị trí",
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
  {
    key: "updated_time",
    headerLabel: "Thời gian",
    type: "string",
  },
];

export default busInfoTableConfigs;
