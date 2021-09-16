import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/intergations/firebase';

import Canvas from '@/canvas/Canvas';
import BackgroundPro from '@/canvas/objects/BachgroundPro';
import { loadFontFamilies } from '@/canvas/utils/textUtil';

import Panel from '@/components/Panel/index';
import Tab from '@/components/Tab/index';
import Slide from '@/components/Slide/index';
import Toolbar from '@/components/Toolbar/index';
import Color from '@/components/Color/index';

import { backgroundPro } from '@/canvas/constants/defaults';

const Home: NextPage = () => {
  const [canvas, setCanvas]: any = useState();
  const [width, setWidth]: any = useState(null);
  const [widthBg, setWidthBg] = useState(1200);
  const [heightBg, setHeightBg] = useState(600);
  const [slides, setSlides]: any = useState([]);
  const [active, setActive] = useState(0);
  const [tabActive, setTabActive] = useState(0);

  useEffect(() => {
    const fetchsData = async () => {
      const fontsData: any = [];
      const querySnapshot = await getDocs(collection(db, 'tests'));
      querySnapshot.forEach((doc) => {
        fontsData.push(doc.data());
      });

      const convertData = fontsData.map((item: any) => {
        const { name, url } = item;
        return { fontFamily: name, value: name, fontUrl: url, label: url };
      });

      loadFontFamilies(convertData);
    };

    fetchsData();
  }, []);

  useEffect(() => {
    if (!canvas) return;

    function resize() {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
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
      setWidth(window.innerWidth);

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
    }

    window.addEventListener('resize', resize);

    canvas?.on('mouse:wheel', (opt: any) => {
      const center = canvas.getCenter();
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();

      zoom *= 0.999 ** delta;
      if (zoom > 10) zoom = 10;
      if (zoom < 0.1) zoom = 0.1;
      canvas.zoomToPoint({ x: center.left + 211, y: center.top }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    let panning = false;
    let lastPosX: any;
    let lastPosY: any;

    canvas?.on('mouse:up', (e: any) => {
      panning = false;
    });

    canvas?.on('mouse:down', function (opt: any) {
      var evt = opt.e;
      panning = true;

      lastPosX = evt.clientX;
      lastPosY = evt.clientY;
    });

    canvas?.on('mouse:move', (opt: any) => {
      if (panning && opt && opt.e && canvas.defaultCursor === 'grab') {
        var e = opt.e;
        var vpt = canvas.viewportTransform;
        vpt[4] += e.clientX - lastPosX;
        vpt[5] += e.clientY - lastPosY;
        canvas.requestRenderAll();
        lastPosX = e.clientX;
        lastPosY = e.clientY;
      }
    });

    if (canvas) {
      if (slides.length == 0) {
        const json: any = {
          objects: [backgroundPro],
        };

        setSlides([json]);
      }
      canvas?.loadFromJSON(slides[active], canvas?.renderAll.bind(canvas));
      canvas?.requestRenderAll();
      canvas?.renderAll();
    }
    //
  }, [canvas, slides]);

  return (
    <div className="">
      <Tab tabActive={tabActive} setTabActive={setTabActive} />
      <Panel tabActive={tabActive} canvas={canvas} />
      <Toolbar>
        <Color canvas={canvas} widthBg={widthBg} heightBg={heightBg} />
      </Toolbar>
      <Canvas setCanvas={setCanvas} />
      <Slide
        canvas={canvas}
        slides={slides}
        active={active}
        setSlides={setSlides}
        setActive={setActive}
      />
    </div>
  );
};

if (process.browser) {
  window.husblizerFont = {};

  var windowFabric: any = window?.fabric;
  windowFabric.BackgroundPro = BackgroundPro;
}

export default Home;
