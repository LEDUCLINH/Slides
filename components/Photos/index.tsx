import { fabric } from 'fabric';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';

import { db } from '@/intergations/firebase';
import { collection, getDocs } from 'firebase/firestore';

import DynamicImagePro from '@/canvas/objects/DynamicImage';
import Data from '@/canvas/utils/InitialsLayer.json';

import { updateSlideItem } from '@/actions/slides';

import Style from './Style';

interface Props {
  canvas: any;
  slides: any;
  active: any;
}

const Index = ({ canvas, active, slides }: Props) => {
  const [models, setModels] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchsData = async () => {
      const modelsData: any = [];
      const querySnapshot = await getDocs(collection(db, 'photos'));
      querySnapshot.forEach((doc) => {
        const image = new Image();
        image.src = doc.data().url;
        image.onload = () => {
          //
        };
        modelsData.push(doc.data());
      });

      setModels(modelsData);
    };

    fetchsData();
  }, []);

  const handleModel = async (model: any) => {
    const initDynamic = Data.Layers[1];

    initDynamic.src = model.url;

    const newDynamicImagePro = new DynamicImagePro({ ...initDynamic, id: v4() });

    dispatch(
      updateSlideItem({
        objects: [...slides[active.current].objects, newDynamicImagePro.toJSON()],
        active: active.current,
      }),
    );

    canvas.add(newDynamicImagePro);
    canvas.setActiveObject(newDynamicImagePro);
    canvas.renderAll();

    // canvas?.transactionHandler?.save('add');
  };

  return (
    <Style>
      <div className="d-flex justify-content-between"></div>
      <div className="d-flex justify-content-between flex-wrap">
        {models.map((model: any) => (
          <div onClick={() => handleModel(model)} key={model.id}>
            <img src={model.url} alt="" />
          </div>
        ))}
      </div>
    </Style>
  );
};

export default Index;
