import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "src/hooks/use-auth";
import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";
import PasswordInput from "src/components/ui/PasswordInput";
import HeaderTitle from "src/components/ui/HeaderTitle";
import { paths } from "src/paths";
import BackgroundDashboard from "../../../public/image/Background_Dashboard.svg";
import type { Page as PageType } from "src/types/page";

const Page: PageType = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = () => {
    router.replace(paths.auth.register);
  };

  const handleSignIn = async () => {
    try {
      if (username == "admin" && password == "123") {
        console.log("Đăng nhập thành công");
        router.replace(paths.dashboard.index);
      } else {
        await signIn(username, password);
      }
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
    <div className="h-screen  flex  md:flex-col lg:flex-row md:h-[1300px] lg:h-screen overflow-y-auto">
      <div className="relative hidden md:block   ">
        <Image
          src={BackgroundDashboard}
          alt="Background images"
          className="md:w-full md:h-[400px] lg:h-full lg:w-full h-full w-full  object-cover "
        />
      </div>

      <div className="flex flex-col max-w-max max-h-max justify-center items-center md:px-[106px] lg:px-[106px] md:w-auto md:h-auto lg:h-auto lg:w-auto p-4 md:m-20 lg:m-0">
        <div
          className="flex self-start px-4 pt-1 pb-1 border-slate-200 border gap-2 w-[115px] text-xs h-[24px] bg-buttons-buttons-secondary-default rounded-lg cursor-pointer"
          onClick={handleGoBack}
        >
          <FaArrowLeftLong />
          <span className="label color-label-input-caret label-text text-xs font-semibold w-[60px] h-[16px]">
            Quay lại
          </span>
        </div>
        <HeaderTitle />
        <div className="w-full max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="label color-label-input-caret label-text text-xs font-semibold">
                Tên đăng nhập
              </span>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập tại đây ..."
                className="input input-bordered w-full px-3"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <div className="gap-6"></div>
              <span className="label color-label-input-caret label-text text-xs font-semibold">
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
                <p className="text-sm font-semibold text-center flex items-center justify-center text-red-500 gap-6">
                  {error}
                </p>
                <div className="mt-5"></div>
              </div>
            )}
            <button
              className="btn bg-orange-400 text-white w-full hover:bg-orange-500"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <>{page}</>;

export default Page;
