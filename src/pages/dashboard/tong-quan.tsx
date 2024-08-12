"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import type { Page as PageType } from "src/types/page";
import { Loader } from "@googlemaps/js-api-loader";
import { Zoom } from "@mui/material";
import BackgroundDashboard from "../../../public/image/SchoolBus_Systems.png";
import { Grid } from "@mui/material";
import Image from "next/image";
import StudentInfo from "../../../public/image/Student_Info.png";
import LogoHCMUTE from "public/image/logo-hcmute.svg";

const Page: PageType = () => {
  return (
    <div className="w-auto md:h-[1600px] lg:h-screen  h-screen pb-2 overflow-y-auto">
      <Grid>
        {/* Hàng 1 */}
        <Grid container item xs={12}>
          {/* Cột 1 */}
          <Grid item xs={12} sm={6}>
            <div className="rounded-lg overflow-hidden  h-full">
              <div className="bg-white p-6">
                <div className="relative flex flex-col items-center justify-center h-auto bg-white">
                  <div className="text-center">
                    <h1 className="text-xs font-bold">
                      BỘ GIÁO DỤC VÀ ĐÀO TẠO
                    </h1>
                    <h1 className="text-xs font-bold">
                      TRƯỜNG ĐẠI HỌC SƯ PHẠM KĨ THUẬT THÀNH PHỐ HỒ CHÍ MINH
                    </h1>
                    <h1 className="text-xs font-bold">KHOA ĐIỆN - ĐIỆN TỬ</h1>
                    <h1 className="text-xs font-bold">
                      BỘ MÔN KỸ THUẬT MÁY TÍNH - VIỄN THÔNG
                    </h1>
                  </div>

                  <div className="my-8">
                    <Image
                      src={LogoHCMUTE}
                      alt="HCMUTE Logo"
                      width={80}
                      height={80}
                    />
                  </div>

                  <div className="text-center mt">
                    <h2 className="text-x font-bold">ĐỒ ÁN TỐT NGHIỆP</h2>

                    <h3 className="mt-1 text-xl font-bold">
                    XÂY DỰNG HỆ THỐNG HỖ TRỢ GIÁM SÁT<br />
                    HỌC SINH TRÊN XE ĐƯA ĐÓN ỨNG DỤNG AWS
                    </h3>
                  </div>
                  <br />
                  <table className="text-right mt-1">
                    <tbody>
                      <tr>
                        <td className="text-left font-semibold text-xs">
                          GVHD:&nbsp;&nbsp;&nbsp; ThS. TRƯƠNG QUANG PHÚC
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left font-semibold text-xs">
                          SVTH:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NGUYỄN ĐẶNG MAI THY
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left font-semibold text-xs">
                          MSSV:&nbsp;&nbsp;&nbsp;&nbsp;20139039
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Grid>
          {/* Cột 2 */}
          <Grid item xs={12} sm={6}>
            <div className=" overflow-hidden">
              <div className="bg-white">
                <Image
                  src={BackgroundDashboard}
                  alt="Image 1"
                  className="w-auto"
                />{" "}
              </div>
            </div>
          </Grid>
        </Grid>

        {/* Hàng 2 */}
        <Grid container item xs={12}>
          {/* Cột 3 */}
          <Grid item xs={12} sm={6}>
            <div className="rounded-lg overflow-hidden ">
              <div className="bg-white">
                {/* Your content */}
                <Image src={StudentInfo} alt="Image 3" className="w-auto" />
              </div>
            </div>
          </Grid>
          {/* Cột 4 */}
          <Grid item xs={12} sm={6}>
            <div className="rounded-lg overflow-hidden h-auto">
              <div className="bg-white p-6">
                <div className="relative flex flex-col items-center justify-center h-auto">
                  <h6 className="mt-4 text-x font-normal text-justify">
                    Đề tài &quot;
                    <strong>
                      Thiết kế hệ thống giám sát học sinh trên xe đưa đón
                    </strong>
                    &quot; tập trung vào việc phát triển một giải pháp công nghệ
                    thông minh để theo dõi và quản lý quá trình đưa đón học sinh
                    bằng xe buýt. Mục tiêu chính là tối ưu hóa và nâng cao hiệu
                    quả của việc quản lý và giám sát lịch trình của các phương
                    tiện vận chuyển, cải thiện an toàn và hiệu quả của quá trình
                    đưa đón học sinh, đồng thời giảm thiểu nhân công không cần
                    thiết thông qua việc tự động hóa các quy trình.
                    <br />
                    <br />
                    Hệ thống được thiết kế để thu thập và phân tích dữ liệu theo
                    thời gian thực từ các xe buýt, bao gồm vị trí và thông tin
                    về học sinh đang trên xe. Dữ liệu sẽ được lưu trữ trên nền
                    tảng điện toán đám mây và tích hợp ứng dụng điểm danh bằng
                    công nghệ nhận diện khuôn mặt hai lớp bảo mật. Tất cả các
                    thông tin sẽ được tập hợp và hiển thị trên một trang web,
                    giúp trung tâm quản lý dễ dàng nắm bắt thông tin của toàn bộ
                    quá trình di chuyển. Việc thiết kế và triển khai hệ thống
                    này nhằm mục đích nâng cao hiệu quả quản lý, giảm thiểu rủi
                    ro và cung cấp một phương tiện an toàn, đáng tin cậy cho
                    việc đưa đón học sinh bằng xe buýt.
                  </h6>
                </div>
                {/* Your content */}
              </div>
            </div>
          </Grid>
        </Grid>
        {/* <div className="h-2 w-12">{""}</div> */}
      </Grid>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
