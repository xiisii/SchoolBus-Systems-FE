import React from "react";
import Image from "next/image";
const HeaderTitle = () => {
  return (
    <div className="w-[388px] h-[220px] px-4 pt-8 pb-6 gap-6">
      <div className="flex flex-col items-center relative self-center w-[356px] h-[76px] p-[16px] flex-[0_0_auto] bg-slate-50 rounded-[16px] justify-center">
        <Image
          className="relative w-[24px] h-[24px] gap-[1px]"
          alt="Header images 1"
          src={require("../../../public/logos/schoolbus-system-logo.jpg")}
        />
        <p className="text-xs font-semibold">SchoolBus Systems</p>
      </div>
      <h1 className="font-semibold text-black text-center font-inter text-2xl font-text-3xl-semibold leading-9 align-self-stretch w-[356px] h-[72px]">
        Hệ thống đưa đón đến trường
      </h1>
    </div>
  );
};

export default HeaderTitle;
