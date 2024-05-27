import React from "react";
import Image from "next/image";
import LogoSystem from "../../public/image/Logo_System.svg";
import LogoHCMUTE from "../../public/image/logo-hcmute.svg";
import LogoFEEE from "../../public/image/logo2.png";
import LogoCEE from "../../public/image/logo3.png";
import { useRouter } from "next/router";
import { paths } from "src/paths";

const HeaderSection = () => {
  const router = useRouter();

  const handleGoBack = () => {
    console.log("Quay lại");
    router.replace(paths.index);
  };

  const handleImageClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex items-center justify-between px-4 pb-4 w-screen bg-[#fffae4]">
      <div className="flex-shrink-0">
        <Image
          src={LogoHCMUTE}
          className="object-contain w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
          alt="HCMUTE Logo"
        />
      </div>
      <div className="flex-shrink-0">
        <Image
          src={LogoFEEE}
          className="object-contain w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
          alt="FCEE Logo"
        />
      </div>
      <div className="flex-grow flex justify-center md:mr-40">
        <Image
          src={LogoSystem}
          className="object-contain cursor-pointer w-[200px] h-auto md:w-[1000px] md:h-[150px]"
          alt="Schoolbus System Logo"
          onClick={() => {
            handleImageClick(paths.index);
          }}
        />
      </div>
      <div className="flex-shrink-0">
        <Image
          src={LogoCEE}
          className="object-contain w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
          alt="CEE Logo"
        />
      </div>
    </div>
  );
};

export default HeaderSection;
