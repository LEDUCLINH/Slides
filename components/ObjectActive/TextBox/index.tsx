import React, { useEffect, useRef, useState } from 'react';
import { Input, Select, Tooltip } from 'antd'
import { ChromePicker } from 'react-color'

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/intergations/firebase';

import { CenterAlign, LeftAlign, RightCenter, BringForward, Duplicate, SendBackwards, Delete } from '@/svg/index'

import Style from './Style'

interface Props {
  object: any;
  canvas: any;
}

const { Option } = Select;

const Index = ({ object, canvas }: Props) => {
  const [text, setText] = useState()
  const {originalText} = object
  const { fontFamily, textAlign, fill } = object.item(0)
  const [color, setColor] = useState('#fff');
  const [fonts, setFonts] = useState([])
  const [align, setAlign] = useState('center')
  const [font, setFontFamily] = useState('')
  const [pickerVisiable, setVisible] = useState(false);

  const colorRef: any = useRef()

  useEffect(() => {
    setText(originalText)
    setFontFamily(handleFontName(fontFamily))
    setAlign(textAlign)
    setColor(fill)
  }, [object])

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

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!colorRef.current?.contains(e.target)) {
        setVisible(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  const handleText = (e: any) => {
    const { value } = e.target

    object.setText(value, '')
    setText(value)
  }
  const handleFontName = (name: string) => {
    if (name[0] === "'") {
      return name.substring(1, name.length - 1)
    }

    return name
  }

  const handleFont = (value: string) => {
    setFontFamily(handleFontName(value))
    object.setFontFamily(value)
  }

  const handleTextAlign = (value: string) => {
    setAlign(value)
    object.setTextAlign(value)
  }

  const handleColor = (e: any) => {
    object.updateColor('fill', e.hex)
    setColor(e.hex)
  }

  const handleBringForward = () => {
    object.setZIndex('forward')
  
  }

  const handleSendBackwards = () => {
    object.setZIndex('backward')
  }

  const handleDuplicate = () => {
    object.cloneObject()
  }

  const handleDelete = () => {
    canvas.remove(object)
  }

  return (
    <Style>
      <Input className="text__content" value={text} onChange={handleText} />
      <Select
        style={{ width: '200px' }}
        value={font}
        onChange={handleFont}
        className="text__fontFamily"
      >
        {fonts.map((font: any, index) => {
          return (
            <Option key={index} value={font.name}>
              {font.name}
            </Option>
          )
        })}
      </Select>
      <div className="text__align">
        <span onClick={() => handleTextAlign('left')} className={`${align === 'left' ? 'active' : ''}`}>
          <LeftAlign />
        </span>
        <span onClick={() => handleTextAlign('center')} className={`${align === 'center' ? 'active' : ''}`}>
          <CenterAlign />
        </span>
        <span onClick={() => handleTextAlign('right')} className={`${align === 'right' ? 'active' : ''}`}>
          <RightCenter />
        </span>
      </div>
      <div ref={colorRef} className="text__color">
        {!pickerVisiable ? (
          <Tooltip title="Color" mouseLeaveDelay={0}>
          <div onClick={() => {
            setVisible(true)
          }}>
            <svg
              width="25px"
              height="25px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="currentColor"
              id="colorpicker"
            >
              <path
                d="M9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C9.83 18 10.5 17.33 10.5 16.5C10.5 16.11 10.35 15.76 10.11 15.49C9.88 15.23 9.73 14.88 9.73 14.5C9.73 13.67 10.4 13 11.23 13H13C15.76 13 18 10.76 18 8C18 3.58 13.97 0 9 0ZM3.5 9C2.67 9 2 8.33 2 7.5C2 6.67 2.67 6 3.5 6C4.33 6 5 6.67 5 7.5C5 8.33 4.33 9 3.5 9ZM6.5 5C5.67 5 5 4.33 5 3.5C5 2.67 5.67 2 6.5 2C7.33 2 8 2.67 8 3.5C8 4.33 7.33 5 6.5 5ZM11.5 5C10.67 5 10 4.33 10 3.5C10 2.67 10.67 2 11.5 2C12.33 2 13 2.67 13 3.5C13 4.33 12.33 5 11.5 5ZM14.5 9C13.67 9 13 8.33 13 7.5C13 6.67 13.67 6 14.5 6C15.33 6 16 6.67 16 7.5C16 8.33 15.33 9 14.5 9Z"
                fill="#000"
              />
            </svg>
          </div>
        </Tooltip>
        ) : (
          <ChromePicker color={color} onChange={handleColor} className="color__absolute" />
        )}
      </div>
      <div className="group__ctrl">
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
