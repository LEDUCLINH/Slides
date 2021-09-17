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
