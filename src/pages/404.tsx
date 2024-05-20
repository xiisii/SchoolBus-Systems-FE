import React from "react";
import { paths } from "src/paths";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-lg mx-auto py-16">
          <img
            alt="Not authorized"
            className="w-full h-auto mb-6"
            src="/assets/errors/error-401.png"
          />
          <h1 className={`text-center text-4xl`}>401: Không tìm thấy trang</h1>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push(paths.index)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
