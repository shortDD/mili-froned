import { useEffect, useRef, useState } from "react";
import { FIXED_HEADER_HEIGHT } from "../constants";
import getScrollTop from "../utils/auto-getScrollTop";
import getElementScreenTop from "../utils/getElementScreenTop";
import React from "react";
const getThreshold = (moldElement: React.MutableRefObject<any>) => {
  return (
    getElementScreenTop(moldElement.current) -
    FIXED_HEADER_HEIGHT +
    moldElement.current.offsetHeight
  );
};
const useScrollThreshold = ({
  trackElement,
  moldElement,
}: {
  trackElement: React.MutableRefObject<any>;
  moldElement: React.MutableRefObject<any>;
}) => {
  let threshold = useRef(0);
  const [show, setShow] = useState(false);
  const toggleShow = useRef((threshold: number) => {
    const sTop = getScrollTop();
    setShow(sTop >= threshold ? true : false);
  });
  useEffect(() => {
    function autoWidth() {
      threshold.current = getThreshold(moldElement);
      if (trackElement.current) {
        trackElement.current.style.width =
          moldElement.current.offsetWidth + "px";
      }
    }
    function showReplyBox() {
      if (!threshold.current) {
        threshold.current = getThreshold(moldElement);
      }
      toggleShow.current(threshold.current);
    }
    window.addEventListener("scroll", showReplyBox);
    window.addEventListener("resize", autoWidth);
    return () => {
      window.removeEventListener("scroll", showReplyBox);
      window.addEventListener("resize", autoWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [show];
};
export default useScrollThreshold;
