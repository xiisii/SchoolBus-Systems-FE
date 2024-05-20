import Link from "next/link";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { ReactNode } from "react";

const CommonCard = ({
  title,
  link,
  linkLabel,
  children,
}: {
  title: string;
  link: string;
  linkLabel: string;
  children: ReactNode;
}) => {
  return (
    <div className="p-5 border border-gray-300 rounded-3xl m-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold  mr-4">{title}</h2>
        {link && (
          <Link href={link} className="flex text-orange-500">
            {linkLabel} <HiMiniArrowSmallRight style={{ fontSize: "1.4em" }} />
          </Link>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CommonCard;
