import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import { EllipsisOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fabric } from 'fabric';

import Canvas from '@/canvas/Canvas';
import { backgroundPro } from '@/canvas/constants/defaults';
import TextBox from '@/canvas/objects/TextBox';
import DynamicImagePro from '@/canvas/objects/DynamicImage';

import { updateSlide } from '@/actions/slides';

import Style from './Style';

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

  const [canvasSlide, setCanvasSlide]: any = useState();

  const addSlide = () => {
    const objs: any = {
      color: slides[active.current].color,
      objects: [],
    };

    canvas?.getObjects().forEach((item: any, index: number) => {
      objs.color = slides[active.current].color;
      objs.objects.push(item.toJSON());
    });

    const isBackground = canvas
      ?.getObjects()
      .filter((item: any) => item.toJSON().type === 'backgroundPro');

    if (!isBackground[0]) {
      objs.objects.push({ ...backgroundPro, fill: slides[active.current].color });
    }

    const result = [...slides];
    result[active.current] = objs;

    dispatch(
      updateSlide({
        active: active.current,
        slides: [...result, { objects: [backgroundPro], color: '#fff' }],
      }),
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
    const objs: any = {
      objects: [],
    };

    canvas?.clear();

    canvas?.getObjects().forEach((item: any) => {
      if (item.toJSON().type === 'backgroundPro') {
        objs.objects.push({ ...item.toJSON(), fill: slides[active.current].color });
      } else {
        objs.objects.push(item.toJSON());
      }
    });

    active.current = v;
    setItem(v);
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
        backgroundColor: slides[active.current]['color'],
      });
      var filter = new fabric.Image.filters.BlendColor({
        color: color,
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
  
  useEffect(() => {
    
    let ratio = 1200 / 85
    let ratioHeight = 600 / 48

    const canvases: any = {}
    slides.forEach((slide: any, index: any) => {
      const { objects } = slide
      let datas = []
      if (objects[0].type !== 'backgroundPro') {
        for (let i = objects.length - 1; i >=0; i--) {
          datas.push(objects[i])
        }
      } else {
        datas = [...objects]
      }
      datas[0].full = true
      const newDatas = datas.map(item => {
        if (item.type !== 'backgroundPro') {
          item.width = item.width / ratio;
          item.height = item.height / ratio;
          item.top = item.top / ratio + 24;
          item.left = item.left / ratioHeight + 42.5;
          item.minSize = item.minSize / ratio;
          item.maxSize = item.maxSize / ratio;
        } else {
          item.fill = slide['color'];
        }
        item.typeRender = true;
        item.evented = false;
        item.selectable = false;
        return item
      })
      console.log('newData', newDatas)
      canvases[index] = new fabric.Canvas(`canvas__${index}`, {
        renderOnAddRemove: true,
        allowTouchScrolling: true,
        preserveObjectStacking: true,
        centeredKey: 'shiftKey',
      });
      canvases[index].setWidth(85);
      canvases[index].setHeight(48);
      canvases[index].loadFromJSON({ objects: newDatas }, canvases[index].renderAll.bind(canvases[index]));
      canvases[index].renderAll();
    });
    
    // console.log(data, 'data');
    // // slides.objects.forEach((a: any) => {
    // //   if (a.type === 'backgroundPro' && i !== 0) {
    // //     return;
    // //   }

    // //   if (a.type === 'backgroundPro') {
    // //     i += 1;
    // //   }
    // //   data.push(a);
    // // });
    // // const objetcs = data.map((i: any) => {
    // //   const item: any = { ...i };
    // //   if (item.type === 'backgroundPro') {
    // //     item.fill = slides.slides[currentSlide.current]['color'];
    // //   }

    // //   item.typeRender = true;
    // //   item.evented = false;
    // //   item.selectable = false;
    // //   return {
    // //     ...item,
    // //   };
    // // });

    // data.map((i: any) => {
    //   canvasSlide?.loadFromJSON(i, canvasSlide?.renderAll.bind(canvasSlide));
    //   canvasSlide?.requestRenderAll();
    //   canvasSlide?.renderAll();
    // });

  }, [slides]);
  // console.log(slides, 'slides');
  return (
    <Style>
      <div className="slide-wrap">
        {slides.map((slide: any, index: any) => (
          <div
            onClick={() => {
              handleItem(index);
            }}
            key={index}
            className={classnames('slide-item', item === index && 'slide-item-active')}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              {/* <Canvas
                id={`canvas-editor-${index}`}
                setCanvas={setCanvasSlide}
                index={index}
                width="85px"
                height="48px"
              /> */}
            <canvas className="canvas__realtime" id={`canvas__${index}`}></canvas>
            </div>
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
