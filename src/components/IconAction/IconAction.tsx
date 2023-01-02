import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import useVideoId from "../../hooks/useVideoId";
import useToggleLike from "../../hooks/useToggleLike";
import { changeNum } from "../../utils";

interface IProps {
  likes: number;
  collections: number;
  shares: number;
  isLike: boolean;
}
const IconAction: React.FC<IProps> = ({
  likes,
  collections,
  shares,
  isLike,
}) => {
  const videoId = useVideoId();
  const [toggleLike] = useToggleLike(videoId, (data) => {
    const { seeVideo } = data;
    const { video } = seeVideo;
    const { isLike, likes } = video!;
    return {
      seeVideo: {
        ...seeVideo,
        video: {
          ...video!,
          isLike: !isLike,
          likes: isLike ? likes - 1 : likes + 1,
        },
      },
    };
  });
  return (
    <div className="video-icon-action">
      <div className="icon-action-left">
        <div className="icon-action-item" onClick={toggleLike}>
          <FontAwesomeIcon
            icon={icon({ name: "thumbs-up" })}
            className={isLike ? "active-icon" : "icon"}
            size="2xl"
          />
          <span>{changeNum(likes)}</span>
        </div>
        <div className="icon-action-item">
          <FontAwesomeIcon
            icon={icon({ name: "star" })}
            className="icon"
            size="2xl"
          />
          <span>{collections > 0 ? collections : "收藏"}</span>
        </div>
        <div className="icon-action-item">
          <FontAwesomeIcon
            icon={icon({ name: "share" })}
            className="icon"
            size="2xl"
          />
          <span>{shares > 0 ? shares : "分享"}</span>
        </div>
      </div>
      <div className="icon-action-right"></div>
    </div>
  );
};
export default IconAction;
