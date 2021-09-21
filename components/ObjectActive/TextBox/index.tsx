import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd'

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/intergations/firebase';

import { CenterAlign, LeftAlign, RightCenter} from '@/svg/index'

import Style from './Style'

interface Props {
  object: any;
}

const { Option } = Select;

const Index = ({ object }: Props) => {
  const [text, setText] = useState()
  const {originalText} = object
  const { fontFamily, textAlign } = object.item(0)
  const [fonts, setFonts] = useState([])
  const [align, setAlign] = useState('center')
  const [font, setFontFamily] = useState('')

  useEffect(() => {
    setText(originalText)
    setFontFamily(handleFontName(fontFamily))
    setAlign(textAlign)
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

  return (
    <Style>
      <Input value={text} onChange={handleText} />
      <Select
        style={{ width: '200px' }}
        value={font}
        onChange={handleFont}
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
    </Style>
  );
}

export default Index;
