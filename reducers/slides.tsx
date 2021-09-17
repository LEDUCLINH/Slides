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
    case 'UPDATE_SLIDE_ITEM':
      state[payload.active] = { objects: payload.objects };

      return state;
    default:
      return state;
  }
};

export default slides;
