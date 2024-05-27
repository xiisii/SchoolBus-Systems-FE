import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import type { Page as PageType } from "src/types/page";
import Image from "next/image";
import backgroundImage from "../../../public/logos/schoolbus-system-logo.jpg";
import HeaderTitle from "src/components/ui/HeaderTitle";
import { useRouter } from "next/router";
import {
  AuthContext,
  AuthContextType,
  AuthProvider,
} from "src/contexts/auth/jwt-context";
import PasswordInput from "src/components/ui/PasswordInput";
import { paths } from "src/paths";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMounted } from "src/hooks/use-mounted";
import { FaArrowLeftLong } from "react-icons/fa6";
import BackgroundDashboard from "../../../public/image/Background_Dashboard.svg";
const Page: PageType = () => {
  const router = useRouter();
  const { signIn } = useAuth<AuthContextType>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = () => {
    router.replace(paths.auth.register);
  };

  const handleSignIn = async () => {
    try {
      // await signIn(username, password);
      router.replace(paths.dashboard.index);
    } catch (error: any) {
      console.error(error);
      setError("Vui lòng kiểm tra lại Tên đăng nhập/Mật khẩu");
    }
  };

  useEffect(() => {
    if (username || password) {
      setError("");
    }
  }, [username, password]);
  const handleGoBack = () => {
    console.log("Quay lại");
    router.replace(paths.index);
  };
  return (
    <div className="h-screen flex ">
      <Image
        src={BackgroundDashboard}
        className="flex-1 min-w-0 object-cover"
        alt="Background images"
      />

      <div className="flex flex-col max-w-max max-h-max justify-center items-center px-[106px]">
        <div
          className="flex self-start   px-4 pt-1 pb-1  border-slate-200 border gap-2  w-[115px] text-xs h-[24px] bg-buttons-buttons-secondary-default rounded-lg cursor-pointer"
          onClick={handleGoBack}
        >
          <FaArrowLeftLong />
          <span className="label color-label-input-caret label-text text-xs  font-semibold w-[60px] h-[16px]">
            Quay lại
          </span>
        </div>
        <HeaderTitle />
        <div className="justify-start items-start max-w-max max-h-max ">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              handleSignIn();
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="label color-label-input-caret label-text text-xs  font-semibold ">
                Tên đăng nhập
              </span>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập tại đây ..."
                className="input input-bordered w-[388px] px-3"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <div className="gap-6"></div>
              <span className="label color-label-input-caret label-text text-xs  font-semibold">
                Mật khẩu
              </span>

              <PasswordInput
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                showPassword={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="mt-5"></div>
            {error && (
              <div>
                <p className="text-sm font-semibold text-center flex items-center justify-center  text-red-500 gap-6">
                  {error}
                </p>
                <div className="mt-5"> </div>
              </div>
            )}
            <button
              className="btn  bg-orange-400 text-white w-full hover:bg-orange-500"
              type="submit" // Specify the button type as "submit"
            >
              Đăng nhập
            </button>
          </form>
          {/* <div className="flex items-center gap-0">
            <button
              className="btn bg-none border-none  px-4 pt-1 pb-1 max-w-max h-[24px] text-xs	"
              onClick={() => handleSignUp()}
            >
              Đăng ký tài khoản
            </button>
            <span>/</span>
            <button className="btn bg-none border-none  px-4 pt-1 pb-1 max-w-max  h-[24px] text-xs	">
              Quên mật khẩu
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <>{page}</>;

export default Page;
