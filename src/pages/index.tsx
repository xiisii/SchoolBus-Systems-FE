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
import LeftImage from "../../public/logos/portrait-man-face-scann.jpg";
import RightImage from "../../public/logos/login.png";
import LogoImage from "../../public/logos/schoolbus-system-logo.jpg";

const Page: PageType = () => {
  const router = useRouter();

  const handleGoBack = () => {
    console.log("Quay lại");
    router.replace(paths.auth.login);
  };

  const handleImageClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="h-screen flex flex-col w-screen ">
      <div
        className="flex flex-col text-center pt-8 pb-4"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src={LogoImage}
          className="object-cover w-30 h-30 md:w-44 md:h-36 self-center cursor-pointer"
          alt="Schoolbus System Logo"
        />
      </div>
      <div className="flex flex-col text-center mt-4">
        <h1 className="text-2xl md:text-4xl text-blue-500">
          Chào mừng bạn đến với hệ thống quản lý xe đưa đón đến trường học
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 self-center items-center mt-8 md:mt-16">
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <Image
            src={LeftImage}
            className="cursor-pointer object-cover w-auto md:w-1/2 lg:w-1/3 h-auto"
            alt="Background image 2"
            onClick={() => handleImageClick("/face_recognition")}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-blue-500">
            Đăng ký xác thực khuôn mặt
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={RightImage}
            className="cursor-pointer object-cover w-auto md:w-3/4 lg:w-1/2 h-auto"
            alt="Background image 2"
            onClick={() => handleImageClick("/auth")}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-blue-500">
            Đến giao diện đăng nhập
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
