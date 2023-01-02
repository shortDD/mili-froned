const getElementScreenTop = (el: any) => {
  let top = el.offsetTop;
  let parent = el.offsetParent;
  while (parent !== null) {
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return top;
};

export default getElementScreenTop;
