import React, { useState, useRef, MouseEvent, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

interface DragHandlers {
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: { clientX: number; clientY: number }) => void;
  onMouseUp: () => void;
}

interface UseDragResult {
  position: Position;
  isDragging: boolean;
  dragHandlers: DragHandlers;
}

export const useDrag = (): UseDragResult => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);
  const originPosition = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    originPosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (isDragging) {
        const deltaX = e.clientX - originPosition.current.x;
        const deltaY = e.clientY - originPosition.current.y;
        setPosition({ x: deltaX, y: deltaY });
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  const dragHandlers: DragHandlers = {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
  };

  return { position, isDragging, dragHandlers };
};
