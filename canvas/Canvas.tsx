import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

import Style from './Style';

interface Props {
  children?: any;
  setCanvas?: any;
  bg?: any;
  id: string;
  width?: string;
  height?: string;
  index?: number;
}

export default function Index({ setCanvas, children, bg, id, width, height, index }: Props) {
  const canvasRef: any = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(`${id}`, {
      renderOnAddRemove: true,
      allowTouchScrolling: true,
      preserveObjectStacking: true,
      centeredKey: 'shiftKey',
    });

    canvas.setWidth(canvasRef.current.clientWidth);
    canvas.setHeight(canvasRef.current.clientHeight);

    setCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [setCanvas]);

  return (
    <Style ref={canvasRef} width={width} height={height} bg={bg} index={index}>
      <canvas id={id}></canvas>
      {children}
    </Style>
  );
}
