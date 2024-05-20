import React, { FC, ReactNode, useState, useCallback } from "react";
import Link from "next/link";
import { Collapse } from "src/components/ui/Collapse";
import clsx from "clsx";
import PropTypes from "prop-types";

interface SideNavItemProps {
  active?: boolean;
  children?: ReactNode;
  depth?: number;
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
}

export const SideNavItem: FC<SideNavItemProps> = (props) => {
  const {
    active,
    children,
    depth = 0,
    disabled,
    external,
    icon,
    label,
    open: openProp,
    path,
    title,
  } = props;
  const [open, setOpen] = useState<boolean>(!!openProp);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    // console.log("toggle clicked ", open, path);
  }, []);

  // Icons can be defined at top level only, deep levels have bullets instead of actual icons.
  let startIcon: ReactNode;

  if (depth === 0) {
    startIcon = icon;
  } else {
    startIcon = (
      <span className="inline-flex items-center justify-center ">
        <span
          className={`bg-nav-item-icon-color rounded-full h-4 w-4 ${
            active && "bg-nav-item-icon-active-color h-4 w-4"
          }`}
        />
      </span>
    );
  }

  if (children) {
    return (
      <li>
        <button
          disabled={disabled}
          onClick={handleToggle}
          className={clsx("btn w-full justify-start border-none")}
        >
          {startIcon && <div className="justify-start">{startIcon}</div>}

          {title}
          <div className="text-nav-item-chevron-color text-sm ml-2 ">
            {open ? (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </div>
        </button>
        {open && (
          <Collapse in={open} className="mt-2">
            {children}
          </Collapse>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link href={path || "#"}>
        <button
          disabled={disabled}
          className={clsx(
            "btn w-full justify-start rounded-xl",
            active ? "btn-primary  text-white" : "btn-ghost text-text-secondary"
          )}
        >
          {startIcon && <span>{startIcon}</span>}
          <div className={clsx("prose-sm prose")}>{title}</div>
          {label && <span className="ml-2">{label}</span>}
        </button>
      </Link>
    </li>
  );
};
SideNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
