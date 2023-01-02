const getScrollTop = () => {
  const sTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  return sTop;
};

export default getScrollTop;
