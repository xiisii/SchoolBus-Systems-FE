import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import type { Page as PageType } from "src/types/page";
import Image from "next/image";
import backgroundImage from "../../public/logos/face-recognition.jpg";
import HeaderTitle from "src/components/ui/HeaderTitle";
import { useRouter } from "next/router";
import {
  AuthContext,
  AuthContextType,
  AuthProvider,
} from "src/contexts/auth/jwt-context";
import PasswordInput from "src/components/ui/PasswordInput";
import { paths } from "src/paths";
import { IssuerGuard } from "src/guards/issuer-guard";
import { GuestGuard } from "src/guards/guest-guard";
import { Issuer } from "src/utils/auth";
import { FaArrowLeftLong } from "react-icons/fa6";

// Import SVGs
import LeftImageSvg from "../../public/image/Application_CheckIn.svg";
import RightImageSvg from "../../public/image/Application_Management.svg";
import LogoSystem from "../../public/image/Logo_System.svg";
import HeaderSection from "src/components/header_section";
const Page: PageType = () => {
  const router = useRouter();

  const handleImageClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <HeaderSection />
      <div className="flex flex-col text-center mt-4">
        <h1 className="text-2xl md:text-4xl text-[#3a84ee]">
          Hệ thống giám sát học sinh trên xe đưa đón
        </h1>
      </div>
      <div className="flex flex-col md:flex-row flex-grow mt-8 md:mt-16">
        <div className="flex flex-col items-center w-full md:w-1/2 p-4">
          <img
            src={LeftImageSvg.src}
            className="cursor-pointer object-cover w-1/2 h-auto md:min-w-[200px] md:max-w-[800px]"
            alt="Ứng dụng điểm danh"
            onClick={() => handleImageClick("/face_recognition")}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-[#df9717]">
            Ứng dụng điểm danh
          </h1>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 p-4">
          <img
            src={RightImageSvg.src}
            className="cursor-pointer object-cover w-1/2 h-auto md:min-w-[200px] md:max-w-[800px]"
            alt="Phần mềm quản lý"
            onClick={() => handleImageClick("/auth")}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-[#df9717]">
            Phần mềm quản lý
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
