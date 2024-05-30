import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PiGitForkBold } from "react-icons/pi";
import { CardTableConfig } from "src/components/card-table";
import { DriverInfo, DriverInfoDetail } from "src/types/driver-info";

const driverInfoTableConfigs: CardTableConfig<
  DriverInfoDetail["id"],
  DriverInfoDetail
>[] = [
  // {
  //   key: "id",
  //   headerLabel: "ID",
  //   type: "string",
  // },
  {
    key: "name",
    headerLabel: "Tên",
    type: "string",
  },

  // {
  //   key: "role",
  //   headerIcon: <PiGitForkBold size={24} />,
  //   headerLabel: "Nhóm quyền",
  //   type: "string",
  //   // renderCell: (cellData) => cellData.permissions[0]?.name || "--",
  // },
  {
    key: "phone",
    headerLabel: "Số điện thoại",
    type: "string",
  },
  {
    key: "car",
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
