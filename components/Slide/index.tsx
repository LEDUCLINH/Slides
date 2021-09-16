import React, { useState } from 'react';
import classnames from 'classnames';
import { EllipsisOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';

import { backgroundPro } from '@/canvas/constants/defaults';

import Style from './Style';

interface Props {
  slides: any;
  active: any;
  setSlides: any;
  setActive: any;
  canvas: any;
}

export default function Index({ canvas, slides, active, setSlides, setActive }: Props) {
  const [item, setItem] = useState(0);

  const addSlide = () => {
    const objs: any = {
      objects: [],
    };

    canvas?.getObjects().forEach((item: any) => objs.objects.push(item.toJSON()));

    const result = [...slides];

    result[active] = objs;
    console.log(result, 'result');
    setSlides([...result, { objects: [backgroundPro] }]);

    canvas?.loadFromJSON(slides[active], canvas?.renderAll.bind(canvas));
    canvas.requestRenderAll();
    canvas.renderAll();
  };

  const handleSlide = (v: any) => {
    const result = [...slides];
    result.splice(item, 1);

    setSlides(result);
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

  return (
    <Style>
      <div className="slide-wrap">
        {slides.map((slide: any, index: number) => (
          <div
            onClick={() => setActive(index)}
            key={index}
            className={classnames('slide-item', active === index && 'slide-item-active')}
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
