import { backgroundPro } from '@/canvas/constants/defaults';

const initialState: any = {
  slides: [
    {
      color: '#fff',
      objects: [backgroundPro],
    },
  ],
  preview: {
    total: 1,
    current: 0,
    slides: [],
  },
};

const slides = (state = initialState, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case 'UPDATE_SLIDE':
      state.slides = payload.slides;

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

      return { ...state, slides: state.slides };

    case 'UPDATE_PREVIEW_SLIDE':
      state.preview.slides = payload.slides;

      return {
        ...state,
        preview: {
          ...state.preview,
          total: state.preview.total,
          current: state.preview.current,
        },
      };

    case 'UPDATE_CURRENT_SLIDE':
      return {
        ...state,

        preview: {
          ...state.preview,
          current: payload,
        },
      };
    default:
      return { ...state };
  }
};

export default slides;
