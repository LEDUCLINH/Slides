import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fabric } from 'fabric';

import Canvas from '@/canvas/Canvas';
import BackgroundPro from '@/canvas/objects/BachgroundPro';
import DynamicImagePro from '@/canvas/objects/DynamicImage';
import TextBox from '@/canvas/objects/TextBox';
import { backgroundPro } from '@/canvas/constants/defaults';

import Style from './Style';

export default function Index() {
  const [canvas, setCanvas]: any = useState();

  const previewSlide = useSelector((state: any) => state.slides.preview);

  const [width, setWidth]: any = useState(null);
  const [widthBg, setWidthBg] = useState(1200);
  const [heightBg, setHeightBg] = useState(600);
  const [tabActive, setTabActive] = useState(1);

  console.log(
    {
      objects: previewSlide.slides[previewSlide.current].objects.map((i: any) => {
        const item: any = { ...i };
        if (item.type === 'backgroundPro')
          item.fill = previewSlide.slides[previewSlide.current]['color'];
        item.width = window.innerWidth;
        item.height = window.innerHeight;
        item.typeRender = true;

        return {
          ...item,
        };
      }),
    },
    'hello',
  );

  useEffect(() => {
    if (!canvas) return;

    function resize() {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (canvas.width <= canvas.height) {
        canvas.setViewportTransform([
          canvas.width / widthBg,
          0,
          0,
          canvas.width / widthBg,
          canvas.getCenter().left,
          canvas.getCenter().top,
        ]);
        canvas.requestRenderAll();
        canvas.renderAll();
      } else {
        canvas.setViewportTransform([
          canvas.height / heightBg,
          0,
          0,
          canvas.height / heightBg,
          canvas.getCenter().left,
          canvas.getCenter().top,
        ]);
        canvas.requestRenderAll();
        canvas.renderAll();
      }
      setWidth(window.innerWidth);

      let scaleX = canvas?.getWidth() / widthBg;
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

      canvas?.zoomToPoint(new fabric.Point(center.left, center.top), scaleX);
      canvas?.requestRenderAll();
      canvas?.renderAll();
    }

    window.addEventListener('resize', resize);

    canvas.clear();

    canvas?.loadFromJSON(
      {
        objects: previewSlide.slides[previewSlide.current].objects.map((i: any) => {
          const item: any = { ...i };
          if (item.type === 'backgroundPro')
            item.fill = previewSlide.slides[previewSlide.current]['color'];
          item.width = window.innerWidth;
          item.height = window.innerHeight;
          item.typeRender = true;

          return {
            ...item,
          };
        }),
      },
      canvas?.renderAll.bind(canvas),
    );

    canvas?.requestRenderAll();
    canvas?.renderAll();
    //
  }, [canvas]);

  return (
    <Style>
      <Canvas setCanvas={setCanvas} />
    </Style>
  );
}

if (process.browser) {
  window.husblizerFont = {};

  var windowFabric: any = window?.fabric;
  windowFabric.BackgroundPro = BackgroundPro;
  windowFabric.DynamicImagePro = DynamicImagePro;
  windowFabric.TextBox = TextBox;
}
