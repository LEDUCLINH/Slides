import { backgroundPro } from '@/canvas/constants/defaults';

const initialState: any = {
  slides: [
    {
      color: '#fff',
      objects: [backgroundPro],
    },
  ],
};

const slides = (state = initialState, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case 'UPDATE_SLIDE':
      state.slides = payload.slides;
      console.log(state.slides, 'state.slides');
      return { ...state };
    case 'UPDATE_SLIDE_ITEM':
      state.slides[payload.active]['objects'] = payload.objects;
      return { ...state, slides: state.slides };
    case 'UPDATE_SLIDE_ACTIVE_ITEM':
      return { ...state };
    case 'UPDATE_SLIDE_COLOR':
      const index = state.slides[payload.active].objects.findIndex(
        (i: any) => i.type === 'backgroundPro',
      );

      if (index !== -1) {
        state.slides[payload.active]['color'] = payload.color;
        state.slides[payload.active].objects[index]['fill'] = payload.color;
      }

      console.log(state.slides, 'state.slides');

      return { ...state, slides: state.slides };
    default:
      return { ...state };
  }
};

export default slides;
