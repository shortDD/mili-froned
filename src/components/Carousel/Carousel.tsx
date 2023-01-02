import React, { useRef, useEffect, useState } from "react";
import "./index.scss";
interface Picture {
  link: string;
  url: string;
  alt: string;
}
interface IProps {
  /*图片数组*/
  pictures: Picture[];
}
const getNewPictures = (old: Picture[], index?: number) => {
  if (!index) {
    const newPictures = old.slice();
    newPictures.push(newPictures.shift()!);
    return newPictures;
  } else {
    if (index === 1) return old;
    const newPictures = [...old.slice(index - 1), ...old.slice(0, index - 1)];
    return newPictures;
  }
};
const Carousel: React.FC<IProps> = ({ pictures }) => {
  const length = pictures.length;
  const carouselWidth = `${length * 100}%`;
  const startOffset = `${100 / length}%`;
  const endOffset = `${(100 / length) * 2}%`;
  const [pictureIndex, setPictureIndex] = useState(1);
  const [picturesArr, setPicturesArr] = useState(pictures);
  const [transitionTime, setTransitionTime] = useState(0);
  const [offset, setOffset] = useState(-startOffset + "");
  const move = () => {
    //轮动开始设置动画时长
    setTransitionTime(500);
    //设置偏移位置
    setOffset(endOffset);
    //更新图片index
    setPictureIndex((current) => (current + 1 > length ? 1 : current + 1));
  };
  const reset = () => {
    //动画时间、偏移位置恢复原值
    setTransitionTime(0);
    setOffset(startOffset);
  };
  const changeArr = () => {
    //动画时间、偏移位置恢复原值
    reset();
    //更新数组
    setPicturesArr((old) => getNewPictures(old));
  };
  const startMove = useRef((timer: any) => {
    console.log(timer.current);
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      move();
      setTimeout(() => {
        changeArr();
      }, 1000);
    }, 3000);
  });
  let timer = useRef<any>();
  useEffect(() => {
    startMove.current(timer);
  }, []);
  return (
    <div className="carousel-warp container-lg">
      <div
        className="carousel-container"
        style={{
          width: carouselWidth,
          transform: `translateX(-${offset})`,
          display: "flex",
          flexDirection: "row",
          transition: `transform ${transitionTime}ms`,
        }}
      >
        {picturesArr.map((picture, index) => (
          <div
            key={index}
            className="carousel-slider"
            style={{ width: startOffset }}
          >
            <a
              href={picture.link}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={picture.url}
                alt={picture.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </a>
          </div>
        ))}
      </div>
      <ul className="carousel-btn-nav">
        {pictures.map((_, index) => (
          <li
            key={index}
            className={pictureIndex === index + 1 ? "is-active" : ""}
            onClick={() => {
              startMove.current(timer);
              setPictureIndex(index + 1);
              setPicturesArr(getNewPictures(pictures, index + 1));
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
