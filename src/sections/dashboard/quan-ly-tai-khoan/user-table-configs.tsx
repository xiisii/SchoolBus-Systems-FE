import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PiGitForkBold } from "react-icons/pi";
import { CardTableConfig } from "src/components/card-table";
import { UserDetail } from "src/types/user";

const userTableConfigs: CardTableConfig<UserDetail["id"], UserDetail>[] = [
  {
    key: "username",
    headerLabel: "Tài khoản",
    type: "string",
  },
  {
    key: "password",
    headerLabel: "Mật khẩu",
    type: "string",
  },

  {
    key: "role",
    headerIcon: <PiGitForkBold size={24} />,
    headerLabel: "Nhóm quyền",
    type: "string",
    // renderCell: (cellData) => cellData.permissions[0]?.name || "--",
  },
  {
    key: "name",
    headerLabel: "Tên khách hàng",
    type: "string",
  },
  {
    key: "company",
    headerLabel: "Tên công ty",
    type: "string",
  },
  {
    key: "tax",
    headerLabel: "MST",
    type: "string",
  },
  {
    key: "phone",
    headerLabel: "SĐT",
    type: "string",
  },
  {
    key: "email",
    headerLabel: "Email",
    type: "string",
  },
  {
    key: "address",
    headerLabel: "Địa chỉ",
    type: "string",
  },
];

export default userTableConfigs;
