import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import type { Page as PageType } from "src/types/page";
import Image from "next/image";
import { useRouter } from "next/router";

import { paths } from "src/paths";
import { IssuerGuard } from "src/guards/issuer-guard";
import { GuestGuard } from "src/guards/guest-guard";
import { Issuer } from "src/utils/auth";
import { FaArrowLeftLong } from "react-icons/fa6";
import CheckInOut from "../../../public/image/Check_In_Out.png";
import HeaderSection from "src/components/header_section";

const Page: PageType = () => {
  const router = useRouter();

  const handleGoBack = () => {
    console.log("Quay lại");
    router.replace(paths.index);
  };

  const handleImageClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <HeaderSection />
      <div className="flex flex-col text-center mt-4">
        <h1 className="text-2xl md:text-4xl text-[#3a84ee]">
          Ứng dụng điểm danh học sinh bằng khuôn mặt
        </h1>
      </div>
      <div className="flex flex-col md:flex-row flex-grow mt-8 md:mt-16">
        <div className="flex flex-col items-center w-full md:w-1/2 p-4  ">
          <Image
            src={CheckInOut}
            className="cursor-pointer object-cover w-1/2 h-auto md:min-w-[200px] md:max-w-[800px]"
            alt="Ứng dụng điểm danh"
            onClick={() => handleImageClick(paths.face_recognition.checkin)}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-[#df9717]">
            Check In
          </h1>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 p-4">
          <Image
            src={CheckInOut}
            className="cursor-pointer object-cover w-1/2 h-auto md:min-w-[200px] md:max-w-[800px]"
            alt="Phần mềm quản lý"
            onClick={() => handleImageClick(paths.face_recognition.checkout)}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-[#df9717]">
            Check Out
          </h1>
        </div>
      </div>
    </div>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>{page}</GuestGuard>
  </IssuerGuard>
);

export default Page;
