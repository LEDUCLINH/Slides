import React from 'react';

import Text from '@/components/Text';

import Style from './Style';

interface Props {
  tabActive: number;
  canvas: any;
}

export default function index({ tabActive, canvas }: Props) {
  const renderObj = () => {
    switch (tabActive) {
      case 0:
        return 'Template';

      case 1:
        return <Text canvas={canvas} />;

      default:
        break;
    }
  };

  return <Style>{renderObj()}</Style>;
}
