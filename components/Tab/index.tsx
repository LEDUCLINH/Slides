import React from 'react';
import classnames from 'classnames';

import { Template, Text, Photos } from '@/svg/index';

import Style from './Style';

const list = [
  { name: 'Mẫu', icon: <Template /> },
  { name: 'Photo', icon: <Photos /> },
  { name: 'Text', icon: <Text /> },
];

interface Props {
  setTabActive: any;
  tabActive: number;
}

export default function index({ setTabActive, tabActive }: Props) {
  return (
    <Style>
      <div className="">
        {list.map((item: any, index: number) => (
          <div
            key={item.name}
            className={classnames('tab-item', tabActive === index && 'tab-item-active')}
            onClick={() => setTabActive(index)}
          >
            <span className="">{item.icon}</span>
          </div>
        ))}
      </div>
    </Style>
  );
}
