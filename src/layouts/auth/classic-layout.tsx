import React, { FC, ReactNode } from "react";
import PropTypes from "prop-types";

const TOP_NAV_HEIGHT: number = 16; // Adjust as needed

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className="bg-cover bg-center flex flex-col h-screen">
      <header className="bg-white fixed inset-x-0 top-0">
        <div className="container mx-auto py-2">
          <div className={`h-${TOP_NAV_HEIGHT} flex items-center`}>
            {/* Add your navigation components here */}
          </div>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-4">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};
