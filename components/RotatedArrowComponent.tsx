import { ArrowDownSVG } from "./SVGIcons/ArrowDownSVG";

export const RotatedArrowComponent: IComponent<{
  open: boolean;
  width?: number;
  height?: number;
}> = ({ open, width = 32, height = 32 }) => {
  return (
    <ArrowDownSVG
      width={width}
      height={height}
      className={`hover:stroke-black dark:stroke-white dark:hover:stroke-red-300 transition-transform ${
        open ? "rotate-180" : ""
      }`}
    />
  );
};
