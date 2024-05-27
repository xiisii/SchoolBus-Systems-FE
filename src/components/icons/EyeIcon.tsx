import type { FC } from "react";

interface EyeIconProps {
  className: string;
}

export const EyeIcon: FC<EyeIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10.0007 3.3315C7.5349 3.3315 5.4574 4.54316 3.75073 6.53482C3.16656 7.21565 2.65572 7.94316 2.23989 8.66983C1.98906 9.10982 1.83572 9.44981 1.74572 9.65981C1.65572 9.86898 1.65572 10.1273 1.74572 10.3365C1.83572 10.5465 1.98906 10.8865 2.23989 11.3265C2.65572 12.0531 3.16656 12.7807 3.75073 13.4615C5.4574 15.4531 7.5349 16.6648 10.0007 16.6648C12.4666 16.6648 14.5441 15.4531 16.2507 13.4615C16.8341 12.7807 17.3457 12.0531 17.7607 11.3265C18.0124 10.8865 18.1657 10.5465 18.2557 10.3365C18.3457 10.1273 18.3457 9.86898 18.2557 9.65981C18.1657 9.44981 18.0124 9.10982 17.7607 8.66983C17.3457 7.94316 16.8341 7.21565 16.2507 6.53482C14.5441 4.54316 12.4666 3.3315 10.0007 3.3315ZM10.0007 4.99816C11.9099 4.99816 13.5824 5.974 15.0007 7.62816C15.5107 8.22316 15.9366 8.86316 16.3024 9.50316C16.4316 9.72899 16.4874 9.84565 16.5632 9.99815C16.4874 10.1507 16.4316 10.2673 16.3024 10.4931C15.9366 11.1331 15.5107 11.7731 15.0007 12.3681C13.5824 14.0223 11.9099 14.9981 10.0007 14.9981C8.09156 14.9981 6.41906 14.0223 5.00073 12.3681C4.49073 11.7731 4.06489 11.1331 3.69823 10.4931C3.56989 10.2673 3.51406 10.1507 3.43823 9.99815C3.51406 9.84565 3.56989 9.72899 3.69823 9.50316C4.06489 8.86316 4.49073 8.22316 5.00073 7.62816C6.41906 5.974 8.09156 4.99816 10.0007 4.99816ZM10.0007 6.66482C8.1599 6.66482 6.6674 8.15732 6.6674 9.99815C6.6674 11.839 8.1599 13.3315 10.0007 13.3315C11.8416 13.3315 13.3341 11.839 13.3341 9.99815C13.3341 9.53815 12.9607 9.16482 12.5007 9.16482C12.0407 9.16482 11.6674 9.53815 11.6674 9.99815C11.6674 10.919 10.9207 11.6648 10.0007 11.6648C9.0799 11.6648 8.33406 10.919 8.33406 9.99815C8.33406 9.07732 9.0799 8.33149 10.0007 8.33149C10.2049 8.33149 10.4141 8.36565 10.5999 8.43565C11.0299 8.59815 11.5049 8.37149 11.6674 7.94066C11.8299 7.51066 11.6032 7.03566 11.1724 6.87316C10.7991 6.73232 10.4066 6.66482 10.0007 6.66482Z"
        fill="#374151"
      />
    </svg>
  );
};