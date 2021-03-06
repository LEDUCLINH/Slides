export const updateSlide = (data: any) => {
  return {
    type: 'UPDATE_SLIDE',
    payload: data,
  };
};

export const updateSlideItem = (data: any) => {
  return {
    type: 'UPDATE_SLIDE_ITEM',
    payload: data,
  };
};

export const updateSlideActive = (data: any) => {
  return {
    type: 'UPDATE_SLIDE_ACTIVE_ITEM',
    payload: data,
  };
};

export const updateSlideColor = (data: any) => {
  return {
    type: 'UPDATE_SLIDE_COLOR',
    payload: data,
  };
};

export const updatePreviewSlide = (data: any) => {
  return {
    type: 'UPDATE_PREVIEW_SLIDE',
    payload: data,
  };
};

export const updateCurrentSlide = (data: any) => {
  return {
    type: 'UPDATE_CURRENT_SLIDE',
    payload: data,
  };
};
