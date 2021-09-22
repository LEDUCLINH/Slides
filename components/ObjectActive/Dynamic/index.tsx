import React from 'react';
import { fabric } from 'fabric'
import { v4 } from 'uuid'

import { FillArea, FlipHorizontal, FlipVertical, BringForward, Duplicate, SendBackwards, Delete } from '@/svg/index'

import Style from './Style';

interface Props {
  object: any;
  canvas: any;
}

const Index = ({ object, canvas }: Props) => {


  const handleFlipVertical = () => {
   
    object.item(0).flipY = !object.item(0).flipY
    canvas.renderAll()
  }

  const handleFlipHorizontal = () => {
    object.item(0).flipX = !object.item(0).flipX
    canvas.renderAll()
  }

  const handleBringForward = () => {
    object.setZIndex('forward')
  
  }

  const handleSendBackwards = () => {
    object.setZIndex('backward')
  }

  const handleDuplicate = () => {
    object.clone(
      (clone: any) => {
        canvas.discardActiveObject();
        if (clone.clipPath) {
          fabric.util.enlivenObjects([clone.clipPath], function(arg1: any) {
            clone.clipPath = arg1[0];
          },"")
        }
        clone.set({
          left: clone.left + 10,
          top: clone.top + 10,
          id: v4(),
          name: clone.name + " (cloned)"
        });
        canvas.add(clone);
        canvas.bringToFront(clone);
        canvas.setActiveObject(clone);
      },
      ['id', 'componentType', 'shape'],
    )
  }

  const handleDelete = () => {
    canvas.remove(object)
  }

  const handleFillArea = () => {

    object.setFillArea(!object.fillArea)
  }

  return (
    <Style>
      <div className="group__ctrl">
        <span onClick={handleFillArea}>
          <FillArea />
        </span>
        <span onClick={handleFlipHorizontal}>
          <FlipHorizontal />
        </span>
        <span onClick={handleFlipVertical}>
          <FlipVertical />
        </span>
        <span onClick={handleBringForward}>
          <BringForward />
        </span>
        <span onClick={handleSendBackwards}>
          <SendBackwards />      
        </span>
        <span onClick={handleDuplicate}>
          <Duplicate />   
        </span>
        <span onClick={handleDelete}>
          <Delete />        
        </span>
      </div>
    </Style>
  );
}

export default Index;
