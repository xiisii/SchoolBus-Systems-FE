import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "src/hooks/use-auth";
import type { Page as PageType } from "src/types/page";
import Image from "next/image";
import HeaderTitle from "src/components/ui/HeaderTitle";
import { useRouter } from "next/router";
import Webcam from "react-webcam"; // Thêm import cho react-webcam

import { paths } from "src/paths";
import { IssuerGuard } from "src/guards/issuer-guard";
import { GuestGuard } from "src/guards/guest-guard";
import { Issuer } from "src/utils/auth";
import { FaArrowLeftLong, FaCamera } from "react-icons/fa6";
import LogoImage from "../../../public/logos/schoolbus-system-logo.jpg";
import backgroundImage from "../../../public/logos/face-recognition.jpg";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import HeaderSection from "src/components/header_section";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Page: PageType = () => {
  const router = useRouter();

  const handleGoBack = () => {
    console.log("Quay lại");
    router.replace(paths.index);
    // router.reload();
  };

  const handleImageClick = (path: string) => {
    router.push(path);
  };

  const webcamRef = useRef<Webcam>(null); // Thay thế useRef cho webcamRef

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [register, setRegister] = useState<boolean>(false);
  const [showBackText, setShowBackText] = useState<boolean>(false);
  const [showSendText, setShowSendText] = useState<boolean>(false);
  const handleResetCapture = () => {
    setRegister(false);
    setShowBackText(false);
    setCapturedImage(null);
  };
  const handleRegister = () => {
    setRegister(!register);
  };
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };
  useEffect(() => {
    toast.warn("Bạn cần tải ảnh lên");
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col ">
      <HeaderSection />
      <div className="flex flex-col text-center mt-4">
        <h1 className="text-2xl md:text-4xl text-[#3a84ee]">
          Điểm danh xuống trạm
        </h1>
      </div>
      {/* Lấy camera của máy tính ở đây */}
      <div className="relative flex flex-row flex-wrap  my-16 self-center">
        {/* Hiển thị camera */}
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 max-xl:1/2 h-auto relative mb-4 md:mb-0 self-center">
          <Webcam
            ref={webcamRef}
            audio={false} // Tắt âm thanh (hoặc cấu hình theo nhu cầu của bạn)
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: { ideal: 600 },
              height: { ideal: 600 },
              facingMode: "environment",
            }}
            // onUserMedia={onUserMedia} // Bạn có thể xử lý sự kiện onUserMedia ở đây nếu cần
          />

          {capturedImage && (
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <img src={capturedImage} className="max-w-md max-h-96" />
              <button
                className="absolute top-4 right-4 bg-white text-red-500 rounded-full p-2"
                onClick={handleResetCapture}
                onMouseEnter={() => setShowBackText(true)}
                onMouseLeave={() => setShowBackText(false)}
              >
                <FaArrowLeftLong />
              </button>
              {showBackText && (
                <div className="absolute top-4 right-16 bg-white text-red-500 rounded p-2 text-xs">
                  Quay lại
                </div>
              )}
              <button
                className="absolute top-16 right-4 bg-white text-red-500 rounded-full p-2"
                onClick={handleRegister}
                onMouseEnter={() => setShowSendText(true)}
                onMouseLeave={() => setShowSendText(false)}
              >
                <BsFillSendArrowDownFill />
              </button>
              {showSendText && (
                <div className="absolute top-16 right-16 bg-white text-red-500 rounded p-2 text-xs">
                  Xác thực
                </div>
              )}
            </div>
          )}

          {!capturedImage && (
            <button
              className="absolute bottom-4 left-1/2  transform -translate-x-1/2 bg-white text-red-500 rounded-full p-2"
              onClick={captureImage}
            >
              <FaCamera />
            </button>
          )}
        </div>

        {/* Hiển thị card thông tin xác thực người dùng bên phải */}
        {!register ? (
          <div className="flex w-full md:w-1/2 lg:w-1/2 xl:w-1/2 max-xl:1/2 p-4 h-full self-start">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Hướng dẫn</h2>
                <p className="text-xl">
                  <strong>Bước 1</strong>: Nhìn thẳng vào camera trên màn hình
                </p>
                <p className="text-xl">
                  <strong>Bước 2</strong>: Nhấn nút chụp màn hình ở dưới camera
                </p>
                <p className="text-xl">
                  <strong>Bước 3</strong>: Lựa chọn phương thức điều hướng:
                  <br />
                  <strong>3.1</strong> Nhấn quay lại{" "}
                  <strong>(hình mũi tên)</strong> để chụp lại ảnh
                  <br />
                  <strong>3.2</strong> Nhấn gửi <strong>(hình tam giác)</strong>{" "}
                  để xác nhận gửi ảnh
                </p>
                <p className="text-xl">
                  <strong>Bước 4</strong>: Kiểm tra trạng thái đăng ký xác thực
                  khuôn mặt
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 h-full self-center">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body w-[500px] h-[450px]">
                <h2 className="card-title text-2xl text-orange-500">
                  Thông tin xác thực học sinh
                </h2>
                <p className="text-xl">
                  <br />
                  Tên: <strong>None</strong>
                  <br />
                  <br />
                  Chuyến xe: <strong> None</strong>
                  <br />
                  <br />
                  Vị trí xuống trạm: <strong>None</strong>
                  <br />
                  <br />
                  Xác nhận: <strong>None</strong>
                  <br />
                  <br />
                  Thời gian xuống xe: <strong>None</strong>
                  <br />
                  <br />
                  Trạng thái: <strong>None</strong>
                </p>
                <p className="text-xl text-center text-red-500">
                  <strong>Điểm danh xuống trạm KHÔNG thành công</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>{page}</GuestGuard>
  </IssuerGuard>
);

export default Page;
