import React from 'react';

import Style from './Style';

interface Props {
  children: any;
}

export default function index({ children }: Props) {
  return <Style>{children}</Style>;
}
