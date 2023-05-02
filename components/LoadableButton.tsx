import Button from "@material-tailwind/react/components/Button";
import IconButton from "@material-tailwind/react/components/IconButton";
import { ComponentProps } from "react";

import { LoadingSVG } from "./SVGIcons/LoadingSVG";

type LoadableButton = ComponentProps<typeof Button> & { loading?: boolean };
type LoadableIconButton = ComponentProps<typeof IconButton> & {
  loading?: boolean;
};

export const LoadableButton: IComponent<LoadableButton> = (props) => {
  const btn_props = {
    ...props,
    loading: undefined,
    disabled: props.disabled || props.loading,
  };

  return (
    <Button {...btn_props}>
      {props.loading ? (
        <div className="py-1">
          <LoadingSVG width={18} height={18} />
        </div>
      ) : (
        props.children
      )}
    </Button>
  );
};

export const LoadableIconButton: IComponent<LoadableIconButton> = (props) => {
  const btn_props = {
    ...props,
    loading: undefined,
    disabled: props.disabled || props.loading,
  };

  return (
    <IconButton {...btn_props}>
      {props.loading ? (
        <div className="py-1">
          <LoadingSVG width={18} height={18} />
        </div>
      ) : (
        props.children
      )}
    </IconButton>
  );
};
