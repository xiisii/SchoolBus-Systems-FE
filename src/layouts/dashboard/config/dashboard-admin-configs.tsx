import { RectangleGroupIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { BookshelfFillIcon } from "src/components/icons/BookshelfFillIcon";
import { IoPersonCircleOutline, IoFlag } from "react-icons/io5";
import { paths } from "src/paths";
import { FilesEarmarkFillIcon } from "src/components/icons/FilesEarmarkFillIcon";
import { BsDoorOpen } from "react-icons/bs";

import { FaBus } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { GiSteeringWheel } from "react-icons/gi";

export const getDashboardAdminConfigs = () => {
  return [
    {
      items: [
        {
          title: "Tổng quan",
          path: paths.dashboard["tong-quan"],
          icon: <RectangleGroupIcon className="h-6 w-6" />,
        },

        // {
        //   title: "Quản lý tài khoản",
        //   path: paths.dashboard["quan-ly-tai-khoan"],
        //   icon: <IoPersonCircleOutline className="h-6 w-6" />,
        // },
        {
          title: "Giám sát chuyến xe",
          path: paths.dashboard["giam-sat-chuyen-xe"],
          icon: <FaBus className="h-6 w-6" />,
        },
        {
          title: "Quản lý học sinh",
          path: paths.dashboard["quan-ly-hoc-sinh"],
          icon: <PiStudentBold className="h-6 w-6" />,
        },
        {
          title: "Quản lý tài xế",
          path: paths.dashboard["quan-ly-tai-xe"],
          icon: <GiSteeringWheel className="h-6 w-6" />,
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
