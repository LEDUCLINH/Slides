import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import { EllipsisOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fabric } from 'fabric';

import { backgroundPro } from '@/canvas/constants/defaults';

import Style from './Style';
import { updateSlide } from '@/actions/slides';
import { v4 } from 'uuid';

import TextBox from '@/canvas/objects/TextBox';
import Data from '@/canvas/utils/InitialsLayer.json';

interface Props {
  active: any;
  canvas: any;
  widthBg: any;
  heightBg: any;
  color: any;
}

export default function Index({ canvas, active, widthBg, heightBg, color }: Props) {
  const [item, setItem] = useState(0);

  const slides = useSelector((state: any) => state.slides.slides);
  const dispatch = useDispatch();

  const addSlide = () => {
    const objs: any = {
      objects: [backgroundPro],
    };

    canvas?.getObjects().forEach((item: any) => objs.objects.push(item.toJSON()));

    const result = [...slides];
    result[active.current] = objs;

    dispatch(
      updateSlide({ active: active.current, slides: [...result, { objects: [backgroundPro] }] }),
    );
  };

  const handleSlide = (v: any) => {
    const result = [...slides];
    result.splice(item, 1);

    dispatch(updateSlide({ active: active.current, slides: [...result] }));
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<CopyOutlined />}>Copy</Menu.Item>
      <Menu.Item
        onClick={(e) => {
          handleSlide(e);
          e.domEvent.stopPropagation();
        }}
        icon={<DeleteOutlined />}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

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
        backgroundColor: color,
      });
      var filter = new fabric.Image.filters.BlendColor({
        color: color,
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
  };

  const handleItem = (v: number) => {
    active.current = v;

    setItem(v);

    const objs: any = {
      objects: [],
    };

    canvas?.clear();

    canvas?.getObjects().forEach((item: any) => objs.objects.push(item.toJSON()));

    const result = [...slides];
    result[v] = objs;

    dispatch(updateSlide({ active: v, slides }));

    if (slides[v]) {
      canvas.clear();

      var objects = slides[v].objects;
      for (var i = 0; i < objects.length; i++) {
        if (objects[i].type === 'textBoxPro') {
          const newTextBoxPro = new TextBox(objects[i]);
          canvas.add(newTextBoxPro);
        }

        if (objects[i].type === 'backgroundPro') {
          handleColor();
        }
      }
    }

    canvas?.requestRenderAll();
    canvas?.renderAll();
  };

  return (
    <Style>
      <div className="slide-wrap">
        {slides.map((slide: any, index: number) => (
          <div
            onClick={() => {
              handleItem(index);
            }}
            key={index}
            className={classnames('slide-item', item === index && 'slide-item-active')}
          >
            <Dropdown trigger={['click']} overlay={menu} placement="topCenter" arrow>
              <span
                onClick={(e) => {
                  setItem(index);
                  e.stopPropagation();
                }}
                className="slide-item-icon"
              >
                <EllipsisOutlined />
              </span>
            </Dropdown>
          </div>
        ))}
        <div onClick={addSlide} className="slide-item slide-item-final">
          +
        </div>
      </div>
    </Style>
  );
}
