import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Tooltip } from 'antd';
import { fabric } from 'fabric';

interface Props {
  canvas: any;
  widthBg: number;
  heightBg: number;
}

import Style from './Style';

export default function Index({ canvas, heightBg, widthBg }: Props) {
  const colorRef: any = useRef(null);
  const [pickerVisiable, setVisible] = useState(false);
  const [color, setColor] = useState('#fff');

  const handleColor = (e: any) => {
    const bgUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
    fabric.Image.fromURL(bgUrl, (myImg: any) => {
      myImg.set({
        originX: 'center',
        originY: 'center',
        width: widthBg,
        height: heightBg,
        crossOrigin: 'anonymous',
        backgroundColor: e.hex,
      });
      var filter = new fabric.Image.filters.BlendColor({
        color: e.hex,
        mode: 'tint',
      });
      myImg.filters.push(filter);
      myImg.applyFilters();
      canvas.setBackgroundImage(myImg, canvas.renderAll.bind(canvas));

      if (canvas.width <= canvas.height) {
        canvas.setViewportTransform([
          canvas.width / widthBg - 0.2,
          0,
          0,
          canvas.width / widthBg - 0.2,
          canvas.getCenter().left + 211,
          canvas.getCenter().top - 25,
        ]);
        canvas.requestRenderAll();
        canvas.renderAll();
      } else {
        canvas.setViewportTransform([
          canvas.height / heightBg - 0.2,
          0,
          0,
          canvas.height / heightBg - 0.2,
          canvas.getCenter().left + 211,
          canvas.getCenter().top - 25,
        ]);
        canvas.requestRenderAll();
        canvas.renderAll();
      }

      let scaleX = (canvas.getWidth() - 211) / widthBg;
      const scaleY = canvas.getHeight() / heightBg;
      if (heightBg >= widthBg) {
        scaleX = scaleY;
        if (canvas.getWidth() < widthBg * scaleX) {
          scaleX = scaleX * (canvas.getWidth() / (widthBg * scaleX));
        }
      } else {
        if (canvas.getHeight() < heightBg * scaleX) {
          scaleX = scaleX * (canvas.getHeight() / (heightBg * scaleX));
        }
      }
      const center = canvas.getCenter();

      canvas.zoomToPoint(new fabric.Point(center.left + 211, center.top), scaleX - 0.25);
      canvas.requestRenderAll();
      canvas.renderAll();
    });
    setColor(e.hex);
  };

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!colorRef.current?.contains(e.target)) {
        setVisible(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [pickerVisiable]);

  return (
    <Style color={color}>
      <div className="canvas-fill" ref={colorRef}>
        {!pickerVisiable ? (
          <Tooltip title="Background Color" mouseLeaveDelay={0}>
            <div
              onClick={() => {
                setVisible(true);
                console.log('fbfgbnfgbfbgf');
              }}
              className="color-icon"
            ></div>
          </Tooltip>
        ) : (
          <ChromePicker color={color} onChange={handleColor} />
        )}
      </div>
    </Style>
  );
}
