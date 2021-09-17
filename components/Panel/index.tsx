import React from 'react';

import Text from '@/components/Text';

import Style from './Style';

interface Props {
  tabActive: number;
  canvas: any;
  slides: any;
  active: number;
}

export default function index({ tabActive, canvas, slides, active }: Props) {
  const renderObj = () => {
    switch (tabActive) {
      case 0:
        return 'Template';

      case 1:
        return <Text active={active} canvas={canvas} slides={slides} />;

      default:
        break;
    }
  };

  return <Style>{renderObj()}</Style>;
}
