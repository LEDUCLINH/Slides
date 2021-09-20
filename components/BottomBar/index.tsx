import React from 'react';
import { LeftOutlined, RightOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from 'fabric';

import Canvas from '@/canvas/Canvas';
import BackgroundPro from '@/canvas/objects/BachgroundPro';
import DynamicImagePro from '@/canvas/objects/DynamicImage';
import TextBox from '@/canvas/objects/TextBox';
import { backgroundPro } from '@/canvas/constants/defaults';

import { updateCurrentSlide } from '@/actions/slides';

import Style from './Style';

interface Props {
  currentSlide: any;
  canvas?: any;
  setPreview: any;
}

export default function Index({ currentSlide, canvas, setPreview }: Props) {
  const dispatch = useDispatch();
  const widthBg = 1200;
  const heightBg = 600;

  const previewSlide = useSelector((state: any) => state.slides.preview);
  const slides = useSelector((state: any) => state.slides.preview.slides);

  const handleActiveSlide = (v: string) => {
    if (v === 'next' && currentSlide.current < slides.length - 1) {
      currentSlide.current = currentSlide.current + 1;
    }

    if (v === 'back' && currentSlide.current > 0) {
      currentSlide.current = currentSlide.current - 1;
    }

    canvas?.clear();

    dispatch(updateCurrentSlide(currentSlide.current));

    if (slides[currentSlide.current]) {
      canvas.clear();

      var objects = slides[currentSlide.current].objects;
      for (var i = 0; i < objects.length; i++) {
        if (objects[i].type === 'textBoxPro') {
          const newTextBoxPro = new TextBox(objects[i]);
          canvas.add(newTextBoxPro);
        }

        if (objects[i].type === 'dynamicImagePro') {
          const newDynamicPro = new DynamicImagePro(objects[i]);
          canvas.add(newDynamicPro);
        }

        if (objects[i].type === 'backgroundPro') {
          handleColor();
        }
      }
    }

    const bgUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

    fabric.Image.fromURL(bgUrl, (myImg: any) => {
      myImg.set({
        originX: 'center',
        originY: 'center',
        width: widthBg,
        height: heightBg,
        crossOrigin: 'anonymous',
        backgroundColor: slides[currentSlide.current].color,
      });
      var filter = new fabric.Image.filters.BlendColor({
        color: slides[currentSlide.current].color,
        mode: 'tint',
      });
      myImg.filters.push(filter);
      myImg.applyFilters();
      canvas.setBackgroundImage(myImg, canvas.renderAll.bind(canvas));

      canvas.requestRenderAll();
      canvas.renderAll();
    });

    canvas?.requestRenderAll();
    canvas?.renderAll();
  };

  const handleColor = () => {
    const bgUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

    fabric.Image.fromURL(bgUrl, (myImg: any) => {
      myImg.set({
        originX: 'center',
        originY: 'center',
        width: widthBg,
        height: heightBg,
        crossOrigin: 'anonymous',
        backgroundColor: slides[currentSlide.current].color,
      });
      var filter = new fabric.Image.filters.BlendColor({
        color: slides[currentSlide.current].color,
        mode: 'tint',
      });
      myImg.filters.push(filter);
      myImg.applyFilters();
      canvas.setBackgroundImage(myImg, canvas.renderAll.bind(canvas));

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

      let scaleX = canvas.getWidth() / widthBg;
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

      canvas.zoomToPoint(new fabric.Point(center.left, center.top), scaleX);
      canvas.requestRenderAll();
      canvas.renderAll();
    });
  };

  return (
    <Style>
      <div className="bottom-bar">
        <div className="backnext">
          <div style={{ cursor: 'pointer' }} className="" onClick={() => handleActiveSlide('back')}>
            <LeftOutlined />
          </div>
          <span style={{ cursor: 'pointer' }} className="slide-len">
            {currentSlide.current + 1} / {previewSlide.slides.length}
          </span>
          <div style={{ cursor: 'pointer' }} className="" onClick={() => handleActiveSlide('next')}>
            <RightOutlined />
          </div>
        </div>
        <div className="another">
          <div
            style={{ cursor: 'pointer' }}
            className=""
            onClick={() => {
              setPreview(false);
            }}
          >
            <FullscreenOutlined />
          </div>
        </div>
      </div>
    </Style>
  );
}
