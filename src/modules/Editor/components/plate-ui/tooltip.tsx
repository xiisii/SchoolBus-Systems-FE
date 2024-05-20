"use client";

import React from "react";
import { withCn, withProps } from "@udecode/cn";
import clsx from "clsx";

export function withTooltip<
  T extends React.ComponentType<any> | keyof HTMLElementTagNameMap
>(Component: T) {
  return React.forwardRef<
    React.ElementRef<T>,
    React.ComponentPropsWithoutRef<T> & {
      tooltip?: React.ReactNode;
    }
  >(function ExtendComponent(
    { tooltip, tooltipContentProps, tooltipProps, ...props },
    ref
  ) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const component = <Component ref={ref} {...(props as any)} />;

    if (tooltip && mounted) {
      return (
        <div {...tooltipProps} className={clsx("tooltip")} data-tip={tooltip}>
          {component}
        </div>
      );
    }

    return component;
  });
}
