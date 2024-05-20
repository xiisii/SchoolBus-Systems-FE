import React, { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Section } from "../config/config";
import { SideNav } from "./side-nav";
import { NavColor } from "src/types/settings";
import { SIDE_NAV_WIDTH } from "src/config";
import { useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material";
import { useMobileNav } from "./use-mobile-nav";

const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props;
  return (
    <div className="flex">
      <SideNav color={navColor} sections={sections} />
      <div
        className={`flex-1 flex flex-col max-w-full`}
        style={{ paddingLeft: SIDE_NAV_WIDTH }}
      >
        {children}
      </div>
    </div>
  );
};

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

VerticalLayout.propTypes = {
  children: PropTypes.any,
  navColor: PropTypes.oneOf<NavColor>(["blend-in", "discreet", "evident"]),
  sections: PropTypes.array,
};

export default VerticalLayout;
