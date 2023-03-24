import React from "react";

export const AnalysisSVG: ISvgComponent = ({
  color = "#FFFFFF",
  width = "100%",
  height = "100%",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_30_414)">
        <path
          d="M11.25 21.25H8.75V12.5H11.25V21.25ZM16.25 21.25H13.75V8.75H16.25V21.25ZM21.25 21.25H18.75V16.25H21.25V21.25ZM24.375 23.875H5.625V6.25H24.375V23.875ZM24.375 3.75H5.625C4.25 3.75 3.125 4.875 3.125 6.25V23.75C3.125 25.125 4.25 26.25 5.625 26.25H24.375C25.75 26.25 26.875 25.125 26.875 23.75V6.25C26.875 4.875 25.75 3.75 24.375 3.75Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_30_414">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
