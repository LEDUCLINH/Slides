import React, { useState } from 'react';
import classnames from 'classnames';
import { EllipsisOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { backgroundPro } from '@/canvas/constants/defaults';

import Style from './Style';
import { updateSlide } from '@/actions/slides';

interface Props {
  active: any;
  setActive: any;
  canvas: any;
}

export default function Index({ canvas, active, setActive }: Props) {
  const [item, setItem] = useState(0);

  const slides = useSelector((state: any) => state.slides);
  const dispatch = useDispatch();

  const addSlide = () => {
    const objs: any = {
      objects: [],
    };

    canvas?.getObjects().forEach((item: any) => objs.objects.push(item.toJSON()));

    const result = [...slides];
    result[active] = objs;

    dispatch(updateSlide([...result, { objects: [backgroundPro] }]));
  };

  const handleSlide = (v: any) => {
    const result = [...slides];
    result.splice(item, 1);

    dispatch(updateSlide([...result]));
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

  const handleItem = (v: number) => {
    setActive(v);

    const objs: any = {
      objects: [],
    };

    canvas?.getObjects().forEach((item: any) => objs.objects.push(item.toJSON()));

    const result = [...slides];
    result[v] = objs;

    dispatch(updateSlide([...result]));

    canvas?.loadFromJSON(result[v], canvas?.renderAll.bind(canvas));
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
