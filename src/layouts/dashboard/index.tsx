import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { useSections } from "./config/config";
import VerticalLayout from "./vertical-layout";

interface LayoutProps {
  children?: ReactNode;
  pagePermission?: string;
}

export const Layout: FC<LayoutProps> = (props) => {
  const sections = useSections();

  return <VerticalLayout sections={sections}>{props.children}</VerticalLayout>;
};

Layout.propTypes = {
  children: PropTypes.any,
};
