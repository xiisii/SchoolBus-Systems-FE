"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import type { Page as PageType } from "src/types/page";
import { Loader } from "@googlemaps/js-api-loader";
import { Zoom } from "@mui/material";
import BackgroundDashboard from "../../../public/image/Background_Dashboard.svg";
import { Grid } from "@mui/material";
import Image from "next/image";
import StudentInfo from "../../../public/image/Student_Info.png";
const Page: PageType = () => {
  return (
    <>
      <div className="w-auto md:max-h-full max-h-screen overflow-y-hidden h-auto pb-2">
        <Grid container spacing={2} className="overflow-y-hidden">
          {/* Hàng 1 */}
          <Grid container item xs={12} spacing={2}>
            {/* Cột 1 */}
            <Grid item xs={12} sm={6}>
              <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <div className="bg-white p-6">
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    Thông tin sinh viên
                  </h2>
                  {/* Your content */}
                </div>
              </div>
            </Grid>
            {/* Cột 2 */}
            <Grid item xs={12} sm={6}>
              <div className="rounded-lg overflow-hidden shadow-lg ">
                <div className="bg-white p-6">
                  {/* Your content */}
                  <Image
                    src={StudentInfo}
                    alt="Image 3"
                    className="w-auto "
                  />{" "}
                </div>
              </div>
            </Grid>
          </Grid>

          {/* Hàng 2 */}
          <Grid container item xs={12} spacing={2}>
            {/* Cột 3 */}
            <Grid item xs={12} sm={6}>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="bg-white p-6">
                  {/* Your content */}
                  <Image
                    src={BackgroundDashboard}
                    alt="Image 3"
                    className="w-auto"
                  />
                </div>
              </div>
            </Grid>
            {/* Cột 4 */}
            <Grid item xs={12} sm={6}>
              <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <div className="bg-white p-6">
                  <h2 className="text-lg font-semibold mb-4 text-center ">
                    Giới thiệu về đề tài
                  </h2>
                  {/* Your content */}
                </div>
              </div>
            </Grid>
          </Grid>
          {/* <div className="h-2 w-12">{""}</div> */}
        </Grid>
      </div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
