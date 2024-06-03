import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PiGitForkBold } from "react-icons/pi";
import { CardTableConfig } from "src/components/card-table";
import { StudentInfoDetail } from "src/types/student-info";

const studentInfoTableConfigs: CardTableConfig<
  StudentInfoDetail["id"],
  StudentInfoDetail
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
  {
    key: "bus",
    headerLabel: "Chuyến xe",
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
    key: "locate",
    headerLabel: "Vị trí",
    type: "string",
  },
];

export default studentInfoTableConfigs;
