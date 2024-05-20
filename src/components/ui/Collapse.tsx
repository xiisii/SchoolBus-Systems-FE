import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";

interface CollapseProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  in: boolean;
  children: ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({
  in: isOpen,
  children,
  style,
  className,
  ...rest
}) => {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // If the collapse is open, set the height to auto to show the content
      setHeight(null);
    } else {
      // If the collapse is closed, set the height to 0 to hide the content
      setHeight(0);
    }
  }, [isOpen]);

  const mergedClassName = clsx(className, {
    "overflow-hidden": true,
    "transition-height duration-300": true,
  });

  return (
    <div
      style={{ height: height || undefined, ...style }}
      className={mergedClassName}
      {...rest}
    >
      {children}
    </div>
  );
};
