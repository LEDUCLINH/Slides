import React from 'react';

import Text from '@/components/Text';
import Photos from '@/components/Photos';

import Style from './Style';

interface Props {
  tabActive: number;
  canvas: any;
  slides: any;
  active: any;
}

export default function index({ tabActive, canvas, slides, active }: Props) {
  const renderObj = () => {
    switch (tabActive) {
      case 0:
        return '';

      case 1:
        return <Photos active={active} canvas={canvas} slides={slides} />;

      case 2:
        return <Text active={active} canvas={canvas} slides={slides} />;

      default:
        break;
    }
  };

  return <Style>{renderObj()}</Style>;
}
