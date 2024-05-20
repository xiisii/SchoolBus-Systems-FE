import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

const NoSSRWrapperComponent = ({ children }: { children: ReactNode }) => (
  <React.Fragment>{children}</React.Fragment>
);

const NoSSRWrapper = dynamic(() => Promise.resolve(NoSSRWrapperComponent), {
  ssr: false,
});

export default NoSSRWrapper;
