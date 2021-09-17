import { backgroundPro } from '@/canvas/constants/defaults';

const initialState: any = {
  slides: [
    {
      objects: [backgroundPro],
    },
  ],
};

const slides = (state = initialState, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case 'UPDATE_SLIDE':
      state.slides = payload.slides;
      console.log(payload, 'payload');
      return { ...state };
    case 'UPDATE_SLIDE_ITEM':
      state.slides[payload.active] = { objects: payload.objects };
      console.log({ ...state, slides: state.slides }, 'payload item');
      return { ...state, slides: state.slides };
    case 'UPDATE_SLIDE_ACTIVE_ITEM':
      return { ...state };
    default:
      return { ...state };
  }
};

export default slides;
