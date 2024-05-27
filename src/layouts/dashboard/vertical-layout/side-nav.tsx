import { FC } from "react";
import Link from "next/link";
import { useAuth } from "src/hooks/use-auth"; // Import your auth hook
import { usePathname } from "src/hooks/use-pathname";
import { paths } from "src/paths";
import { Section } from "../config/config";
import SimpleBar from "simplebar-react";
import { SideNavSection } from "./side-nav-section";
import { NavColor } from "src/types/settings";
import { SIDE_NAV_WIDTH } from "src/config";
import Image from "next/image";
import LogoSystem from "../../../../public/image/Logo_System.svg";
import LogoSystemVertical from "../../../../public/image/Logo_System_Vertical.png";

interface SideNavProps {
  color?: NavColor;
  sections?: Section[];
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { user } = useAuth();
  const { sections = [] } = props;
  const pathname = usePathname();

  return (
    <div
      className="fixed inset-0 z-50 h-screen bg-white rounded-[0px_24px_24px_0px] overflow-hidden border-r border-solid border-background-other-divider shadow-lg "
      style={{ width: SIDE_NAV_WIDTH }}
    >
      <div
        className="flex flex-col flex-shrink-0 w-full bg-gray-900 overflow-y-auto h-full"
        style={{
          backgroundColor: "var(--nav-bg)",
          color: "var(--nav-color)",
        }}
      >
        <SimpleBar className="flex-1">
          <div className="flex flex-col items-center pt-[32px] pb-[24px] px-[16px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-center gap-[16px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[4px] p-[16px] relative self-stretch w-full flex-[0_0_auto] bg-tailwindcss-colors-slate-50 rounded-[16px]">
                <Image
                  className="relative w-auto h-auto self-center"
                  alt="Header images 2"
                  src={LogoSystemVertical}
                />
                {/* <p className="text-sm font-semibold">SchoolBus Systems</p> */}
              </div>
              <h1 className="text-lg font-semibold text-primary text-center ">
                Hệ thống giám sát học sinh trên xe đưa đón
              </h1>
            </div>
          </div>

          <div className="h-full flex flex-col flex-1">
            <nav className="flex-grow space-y-2 px-2">
              {sections.map((section, index) => (
                <SideNavSection
                  items={section.items}
                  key={index}
                  pathname={pathname}
                  subheader={section.subheader}
                />
              ))}
            </nav>
          </div>
        </SimpleBar>
        <div className="sticky w-full bottom-0 p-2 cursor-pointer flex">
          <Link
            href={"#"}
            className="sticky w-full bottom-0 p-2 cursor-pointer flex gap-[12px]"
          >
            {/* <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
              <div className="text-sm font-semibold">Quản trị viên</div>
              <div className="text-xs text-text-secondary">Nguyễn Văn Long</div>
            </div> */}
          </Link>
        </div>
      </div>
    </div>
  );
};
