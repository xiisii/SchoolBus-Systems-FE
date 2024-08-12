import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PiGitForkBold } from "react-icons/pi";
import { CardTableConfig } from "src/components/card-table";
import { DriverInfo, DriverInfoDetail } from "src/types/driver-info";

const driverInfoTableConfigs: CardTableConfig<
  DriverInfoDetail["id"],
  DriverInfoDetail
>[] = [
  {
    key: "name",
    headerLabel: "Tên",
    type: "string",
  },
  {
    key: "phone",
    headerLabel: "Số điện thoại",
    type: "string",
  },
  {
    key: "bus",
    headerLabel: "Chuyến xe",
    type: "string",
  },
  {
    key: "status",
    headerLabel: "Trạng thái",
    type: "string",
  },
];

export default driverInfoTableConfigs;
