import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Tooltip } from 'antd';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';

import { updateSlideColor, updatePreviewSlide } from '@/actions/slides';

import { Preview } from '@/svg/index';

import { TextBox, Dynamic } from '@/components/ObjectActive'

import Style from './Style';

interface Props {
  canvas: any;
  widthBg: number;
  heightBg: number;
  color: string;
  active: any;
  preview: any;
  setPreview: any;
  slides: any;
  object: any;
}

export default function Index({
  canvas,
  heightBg,
  widthBg,
  color,
  active,
  preview,
  setPreview,
  slides,
  object
}: Props) {
  const dispatch = useDispatch();

  const colorRef: any = useRef(null);
  const [pickerVisiable, setVisible] = useState(false);
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
      canvas?.setBackgroundImage(myImg, canvas?.renderAll.bind(canvas));

      if (canvas?.width <= canvas?.height) {
        canvas?.setViewportTransform([
          canvas?.width / widthBg - 0.2,
          0,
          0,
          canvas?.width / widthBg - 0.2,
          canvas?.getCenter().left + 211,
          canvas?.getCenter().top - 25,
        ]);
        canvas?.requestRenderAll();
        canvas?.renderAll();
      } else {
        canvas?.setViewportTransform([
          canvas?.height / heightBg - 0.2,
          0,
          0,
          canvas?.height / heightBg - 0.2,
          canvas?.getCenter().left + 211,
          canvas?.getCenter().top - 25,
        ]);
        canvas?.requestRenderAll();
        canvas?.renderAll();
      }

      let scaleX = (canvas?.getWidth() - 211) / widthBg;
      const scaleY = canvas?.getHeight() / heightBg;
      if (heightBg >= widthBg) {
        scaleX = scaleY;
        if (canvas?.getWidth() < widthBg * scaleX) {
          scaleX = scaleX * (canvas?.getWidth() / (widthBg * scaleX));
        }
      } else {
        if (canvas?.getHeight() < heightBg * scaleX) {
          scaleX = scaleX * (canvas?.getHeight() / (heightBg * scaleX));
        }
      }
      const center = canvas?.getCenter();

      canvas?.zoomToPoint(new fabric.Point(center.left + 211, center.top), scaleX - 0.25);
      canvas?.requestRenderAll();
      canvas?.renderAll();
    });

    dispatch(updateSlideColor({ active: active.current, color: e.hex }));
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

  const handlePreview = () => {
    setPreview(true);
    dispatch(
      updatePreviewSlide({
        slides,
        total: slides.length,
        current: 0,
      }),
    );
  };

  const renderHeaderActive = () => {
    const { type } = object
    switch (type) {
      
      case 'textBoxPro':
        return <TextBox canvas={canvas} object={object} />

      case 'dynamicImagePro':
        return <Dynamic canvas={canvas} object={object} />
      
      default: return <></>
    }
  }

  return (
    <Style color={color}>
      <div className="preview" onClick={handlePreview}>
        <Preview />
      </div>
      <div className="control__active">
        {renderHeaderActive()}
      </div>
      <div className="tool-fill">
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
      </div>
    </Style>
  );
}
