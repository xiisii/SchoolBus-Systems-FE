import clsx from "clsx";
import {
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  ThHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag } from "src/hooks/use-drag";
import { useDebounce } from "src/hooks/use_debounce";

export const CustomTableResizableCell = ({
  log,
  onResized,
  forceAuto,
  disableResize,
  ...props
}: {
  log?: boolean;
  onResized?: () => void;
  forceAuto?: boolean;
  disableResize?: boolean;
} & ThHTMLAttributes<HTMLTableCellElement>) => {
  const ref = useRef<HTMLTableCellElement | null>(null);
  const originWidth = useRef<number>();
  const [width, setWidth] = useState<number>();
  const debouncedWidth = useDebounce(width, 200);

  const { position, isDragging, dragHandlers } = useDrag();

  useEffect(() => {
    window.addEventListener("mousemove", dragHandlers.onMouseMove);
    return () =>
      window.removeEventListener("mousemove", dragHandlers.onMouseMove);
  }, [dragHandlers.onMouseMove]);

  useEffect(() => {
    window.addEventListener("mouseup", dragHandlers.onMouseUp);
    return () => window.removeEventListener("mouseup", dragHandlers.onMouseUp);
  }, [dragHandlers.onMouseUp]);

  const handleMouseDown = useCallback<MouseEventHandler>(
    (e) => {
      if (ref.current) {
        originWidth.current = ref.current.getBoundingClientRect().width;
        dragHandlers.onMouseDown(e);
      }
    },
    [dragHandlers]
  );

  useEffect(() => {
    onResized?.();
  }, [debouncedWidth, onResized]);

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.cursor = "default";
    }
  }, [isDragging]);

  useEffect(() => {
    if (ref.current) {
      setWidth(Math.max(40, (originWidth.current || 0) + position.x));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  useEffect(() => {
    if (log) {
      console.log("ref.current", ref.current);
    }
    if (ref.current) {
      if (log) {
        console.log(
          "ref.current.getBoundingClientRect().width",
          ref.current.getBoundingClientRect().width
        );
      }
      originWidth.current = ref.current.getBoundingClientRect().width;
      setWidth(originWidth.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  return (
    <th
      {...props}
      ref={ref}
      className={clsx(
        "overflow-visible relative px-2",
        props.className,
        width ? `w-[${width}px]` : "w-auto"
      )}
    >
      {props.children}
      {!disableResize && (
        <div
          className={clsx(
            "w-4 border-gray h-full absolute top-0 -right-2 cursor-col-resize z-10 hover:px-[6px] hover:[&>div]:bg-neutral-500",
            isDragging ? "px-[6px]" : "px-[8px]"
          )}
          onMouseDown={handleMouseDown}
        >
          <div
            className={clsx(
              "flex flex-col rounded-md w-full h-full",
              isDragging ? "bg-neutral-500" : "bg-neutral-400"
            )}
          ></div>
        </div>
      )}
    </th>
  );
};
