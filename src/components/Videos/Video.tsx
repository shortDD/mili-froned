import { useQuery } from "@apollo/client";
import { IonIcon } from "@ionic/react";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { SEE_VIDEO } from "../../apollo-hooks";
import useVideoId from "../../hooks/useVideoId";
import { seeVideo, seeVideoVariables } from "../../__generated__/seeVideo";
import Comment from "../Comment/Comment";
import IconAction from "../IconAction/IconAction";
import Loading from "../Loading/Loading";
import VideoPlay from "../VideoPlay/VideoPlay";
import "./index.scss";
const Video = () => {
  //----------------------简介---------------------------
  const offsetHeightRef = useRef<number>(0);
  const [introductionHeight, setIntroductionHeight] = useState("auto");
  const [showBtn, setShowBtn] = useState(false);
  const toggleIntroductionHeight = () => {
    if (introductionHeight === "84px") {
      setIntroductionHeight("auto");
    } else {
      setIntroductionHeight("84px");
    }
  };
  //----------------------简介---------------------------
  //----------------------请求---------------------------
  const videoId = useVideoId();
  const { data: seeVideoResult, loading: seeVideoLoading } = useQuery<
    seeVideo,
    seeVideoVariables
  >(SEE_VIDEO, { variables: { id: videoId } });
  //----------------------请求---------------------------
  // if (seeVideoLoading) return <Loading />;
  if (!seeVideoResult?.seeVideo.video || !seeVideoResult.seeVideo.ok)
    return <></>;
  const {
    title,
    totalComments,
    createdAt,
    fileUrl,
    introduction,
    totalRootComments,
    likes,
    isLike,
  } = seeVideoResult.seeVideo.video;
  const createdDate = dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss");
  return (
    <div className="video-wrap">
      <div className="video-title">
        <h1>{title}</h1>
        <div className="title-info">
          <div className="num-of-views item">
            <IonIcon
              icon="play-circle-outline"
              style={{ width: "18px", height: "18px" }}
            />
            <span>21万</span>
          </div>
          <div className="num-of-comments item">
            <IonIcon
              icon="chatbox-ellipses-outline"
              style={{ width: "18px", height: "18px" }}
            />
            <span>{totalComments}</span>
          </div>
          <div className="created-at item">
            <IonIcon
              icon="time-outline"
              style={{ width: "18px", height: "18px" }}
            />
            <span>{createdDate}</span>
          </div>
        </div>
      </div>
      <div className="video-player-wrap">
        <VideoPlay fileUrl={fileUrl} />
      </div>
      <div className="video-icon-action-wrap" style={{ width: "100%" }}>
        <IconAction likes={likes} collections={0} shares={0} isLike={isLike} />
      </div>
      <div className="video-introduction-wrap">
        <div
          className="video-introduction"
          style={{ height: `${introductionHeight}` }}
        >
          <span
            ref={(e) => {
              if (e && !offsetHeightRef.current) {
                offsetHeightRef.current = e.offsetHeight;
                const boolean = e.offsetHeight > 84;
                setIntroductionHeight(boolean ? "84px" : "auto");
                setShowBtn(boolean);
              }
            }}
            id="introduction"
          >
            {introduction ? introduction : "-"}
          </span>
        </div>
        {showBtn && (
          <div
            className="show-all-introduction"
            onClick={toggleIntroductionHeight}
          >
            <span>{introductionHeight === "84px" ? "展开更多" : "收起"}</span>
          </div>
        )}
      </div>
      <div className="video-comments-wrap">
        <Comment
          videoId={videoId}
          totalComments={totalComments}
          totalRootComments={totalRootComments}
        />
      </div>
    </div>
  );
};
export default Video;
