import React, { FC, ReactNode, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Section } from "../config/config";
import { SideNav } from "./side-nav";
import { NavColor } from "src/types/settings";
import { SIDE_NAV_WIDTH } from "src/config";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaList } from "react-icons/fa";

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;
  const [isSideNavVisible, setSideNavVisible] = useState(true);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const handleToggleSideNav = useCallback(() => {
    setSideNavVisible((prevVisible) => !prevVisible);
  }, []);

  return (
    <div className="flex">
      {isMobile && (
        <button
          onClick={handleToggleSideNav}
          className="p-2 fixed top-2 left-2 z-50 bg-gray-900 text-white rounded-md"
        >
          <FaList />
        </button>
      )}
      {isSideNavVisible && (
        <SideNav
          color={navColor}
          sections={sections}
          onToggle={handleToggleSideNav}
        />
      )}
      <div
        className={`flex-1 flex flex-col max-w-full  transition-all duration-300`}
        style={{
          paddingLeft: isSideNavVisible && !isMobile ? SIDE_NAV_WIDTH : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

VerticalLayout.propTypes = {
  children: PropTypes.any,
  navColor: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident"]),
  sections: PropTypes.array,
};

export default VerticalLayout;
