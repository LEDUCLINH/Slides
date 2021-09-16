import { backgroundPro } from '@/canvas/constants/defaults';

const initialState: any = [
  {
    objects: [backgroundPro],
  },
];

const slides = (state = initialState, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case 'UPDATE_SLIDE':
      return payload;
    default:
      return state;
  }
};

export default slides;
