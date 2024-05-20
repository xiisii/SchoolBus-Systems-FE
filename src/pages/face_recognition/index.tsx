import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import type { Page as PageType } from "src/types/page";
import Image from "next/image";
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
import LeftImage from "../../../public/logos/checkin.jpg";
import RightImage from "../../../public/logos/checkout.jpg";
import LogoImage from "../../../public/logos/schoolbus-system-logo.jpg";
import backgroundImage from "../../../public/logos/face-recognition.jpg";

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
    <div className="h-screen w-screen flex flex-col ">
      <div
        className="flex flex-col text-center pt-8 pb-4 h-auto"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src={LogoImage}
          className="object-cover w-30 h-30 md:w-44 md:h-36 h-auto self-center cursor-pointer"
          alt="Schoolbus System Logo"
          onClick={() => handleGoBack()}
        />
      </div>
      <div className="flex flex-col text-center mt-4">
        <h1 className="text-2xl md:text-4xl text-blue-500">
          Vui lòng lựa chọn phương thức xác thực phù hợp
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 self-center items-center mt-8 md:mt-16">
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <Image
            src={LeftImage}
            className="cursor-pointer object-cover w-1/2 md:w-3/4 lg:w-1/2 h-auto"
            alt="Background image 2"
            onClick={() => handleImageClick(paths.face_recognition.checkin)}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-blue-500">
            Đăng ký khuôn mặt
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={RightImage}
            className="cursor-pointer object-cover w-1/2 md:w-3/4 lg:w-1/2 h-auto"
            alt="Background image 2"
            onClick={() => handleImageClick(paths.face_recognition.checkout)}
          />
          <h1 className="text-center text-xl md:text-3xl mt-2 text-blue-500">
            Xác thực khuôn mặt
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
