import type { FC } from "react";

interface ArrowLeftProps {
  className: string;
}

export const ArrowLeft: FC<ArrowLeftProps> = ({ className }) => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      className={className}
    >
      <path
        d="M13.6634 3.98987C13.6634 3.62254 13.3654 3.32521 12.998 3.32521L2.62172 3.33187L4.60085 1.33187L3.66338 0.394531L0.517516 3.51921C0.257182 3.77987 0.257182 4.2172 0.517516 4.47787L3.66338 7.60254L4.60085 6.6652L2.62172 4.6652L12.998 4.6552C13.3654 4.6552 13.6634 4.3572 13.6634 3.98987Z"
        fill="#111827"
      />
    </svg>
  );
};
