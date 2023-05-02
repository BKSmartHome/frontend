import { ReactNode, useRef } from "react";
import {
  Transition as ReactTransition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group";

type TransitionKind<RC> = {
  children: RC;
  location: string;
};

const TIMEOUT = 200;

type TTransitionStyles = {
  [key in TransitionStatus]?: {
    [key: string]: string | number;
  };
};

const TransitionStyles: TTransitionStyles = {
  entering: {
    position: "absolute",
    opacity: 0,
    transform: "translateX(50px)",
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: "translateX(0px)",
    animation: "blink .3s linear 2",
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: "translateX(-50px)",
  },
};

const TransitionLayout: React.FC<TransitionKind<ReactNode>> = function ({
  children,
  location,
}) {
  const nodeRef = useRef();
  return (
    <TransitionGroup className="h-full relative">
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
        nodeRef={nodeRef}
      >
        {(status) => (
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              ...TransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

export { TransitionLayout };
