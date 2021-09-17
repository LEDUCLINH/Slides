import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import TextBox from '@/canvas/objects/TextBox';

import Data from '@/canvas/utils/InitialsLayer.json';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/intergations/firebase';

import Style from './Style';
import { updateSlideItem } from '@/actions/slides';

import { useDispatch } from 'react-redux';

interface Props {
  canvas: any;
  slides: any;
  active: any;
}

export default function Index({ canvas, slides, active }: Props) {
  const [fonts, setFonts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchsData = async () => {
      const fontsData: any = [];
      const querySnapshot = await getDocs(collection(db, 'tests'));
      querySnapshot.forEach((doc) => {
        fontsData.push(doc.data());
      });

      setFonts(fontsData);
    };

    fetchsData();
  }, []);

  const handleAddTextBox = async (font: any) => {
    const initTextBox = Data.Layers[0];
    initTextBox.src = font.url;
    initTextBox.fontFamily = font.name;

    const newTextBoxPro = new TextBox({ ...initTextBox, id: v4() });

    dispatch(
      updateSlideItem({
        objects: [...slides[active.current].objects, newTextBoxPro.toJSON()],
        active: active.current,
      }),
    );

    canvas.add(newTextBoxPro);

    canvas.setActiveObject(newTextBoxPro);
    canvas.renderAll();
  };

  return (
    <Style>
      <ul>
        {fonts.map((font: any, index: number) => (
          <li onClick={() => handleAddTextBox(font)} key={index}>
            <h2 style={{ fontFamily: font.name }}>The quick brown fox jumps over the lazy dog</h2>
            <p>{font.name}</p>
          </li>
        ))}
      </ul>
    </Style>
  );
}
