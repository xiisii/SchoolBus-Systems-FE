import { RectangleGroupIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { BookshelfFillIcon } from "src/components/icons/BookshelfFillIcon";
import { IoPersonCircleOutline, IoFlag } from "react-icons/io5";
import { paths } from "src/paths";
import { FilesEarmarkFillIcon } from "src/components/icons/FilesEarmarkFillIcon";
import { BsDoorOpen } from "react-icons/bs";
import { PiChartPieBold, PiScalesBold } from "react-icons/pi";
import { TbDeviceIpadHorizontalPlus } from "react-icons/tb";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa";
import { GiBuyCard } from "react-icons/gi";

export const getDashboardAdminConfigs = () => {
  return [
    {
      items: [
        {
          title: "Tổng quan",
          path: paths.dashboard["tong-quan"],
          icon: <RectangleGroupIcon className="h-6 w-6" />,
        },

        {
          title: "Quản lý tài khoản",
          path: paths.dashboard["quan-ly-tai-khoan"],
          icon: <IoPersonCircleOutline className="h-6 w-6" />,
        },

        {
          title: "Đăng xuất",
          path: paths.dashboard.logout,
          icon: <BsDoorOpen className="h-6 w-6" />,
        },
      ],
    },
  ];
};
