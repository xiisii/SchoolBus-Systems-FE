import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PiGitForkBold } from "react-icons/pi";
import { CardTableConfig } from "src/components/card-table";
import { StudentInfoDetail } from "src/types/student-info";

const studentInfoTableConfigs: CardTableConfig<
  StudentInfoDetail["id"],
  StudentInfoDetail
>[] = [
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
  {
    key: "locate",
    headerLabel: "Vị trí",
    type: "string",
  },
  {
    key: "status",
    headerLabel: "Trạng thái chuyến xe",
    type: "string",
  },
];

export default studentInfoTableConfigs;
