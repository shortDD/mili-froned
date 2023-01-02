import "./index.scss";

import Video from "../../components/Videos/Video";
import Avatar from "../../components/Avatar/Avatar";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { RECOMMAND, USER_PROFILE_BY_VIDEO } from "../../apollo-hooks";
import {
  userProfileByVideo,
  userProfileByVideoVariables,
} from "../../__generated__/userProfileByVideo";
import useVideoId from "../../hooks/useVideoId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { changeNum } from "../../utils";
import useFollow from "../../hooks/useFollow";
import Skeleton from "../../components/Skeleton/Skeleton";
import { recommand, recommandVariables } from "../../__generated__/recommand";

const UserCard = () => {
  const videoId = useVideoId();
  const { data: userData, loading } = useQuery<
    userProfileByVideo,
    userProfileByVideoVariables
  >(USER_PROFILE_BY_VIDEO, { variables: { videoId } });
  const [followUser] = useFollow({
    userId: userData?.userProfileByVideo.user?.id!,
    isMe: userData?.userProfileByVideo.user?.isMe!,
    isfollowing: userData?.userProfileByVideo.user?.isfollowing!,
  });
  return (
    <>
      <div className="up-user-avatar">
        <Avatar
          size="lg"
          avatarUrl={userData?.userProfileByVideo.user?.avatar}
        />
      </div>
      <div className="up-info-right">
        <div className="up-info-username">
          <Link to={`/profile:${userData?.userProfileByVideo.user?.id}`}>
            {userData?.userProfileByVideo.user?.username}
          </Link>
          <a href="http://localhost:3000" className="send-message">
            <FontAwesomeIcon
              icon={icon({ name: "envelope" })}
              className="send-message-icon"
            />
            发消息
          </a>
        </div>
        <div
          className="up-info-bio"
          title={
            userData?.userProfileByVideo.user?.bio
              ? userData.userProfileByVideo.user.bio
              : "这个人很懒什么都没有写！！！"
          }
        >
          {userData?.userProfileByVideo.user?.bio
            ? userData?.userProfileByVideo.user.bio
            : "这个人很懒什么都没有写！！！"}
        </div>
        <div className="btn-panel">
          {loading ? (
            <div className="follow-btn"></div>
          ) : (
            <div
              onClick={followUser}
              className={`follow-btn ${
                userData?.userProfileByVideo.user?.isfollowing
                  ? ""
                  : "not-follow"
              }`}
            >
              <span>
                <FontAwesomeIcon
                  icon={icon({ name: "plus" })}
                  style={{ marginRight: "5px" }}
                />
                {userData?.userProfileByVideo.user?.isfollowing
                  ? `已关注 ${userData?.userProfileByVideo.user.totalFolloweds}`
                  : `关注 ${userData?.userProfileByVideo.user?.totalFolloweds}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Recommand = () => {
  const videoId = useVideoId();
  const number = 11213;
  const { data, loading } = useQuery<recommand, recommandVariables>(RECOMMAND, {
    variables: { input: { take: 15, videoId } },
  });
  if (loading) return <Skeleton number={20} />;
  return (
    <>
      <div className="rec-title">相关视频</div>
      <div className="rec-list">
        {data?.recommand.videos?.map((video) => (
          <div className="video-card" key={video.id}>
            <div className="card-box">
              <div className="pic-box">
                <div className="pic">
                  <a href={`http://localhost:3000/video:${video.id}`}>
                    <img
                      alt=""
                      src={video.coverUrl}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </a>
                </div>
                {/*预播放*/}
              </div>
              <div className="info">
                <a href={`http://localhost:3000/video:${video.id}`}>
                  <p title={video.title} className="title">
                    {video.title}
                  </p>
                </a>
                <div className="upname">
                  <Link to="">
                    <FontAwesomeIcon
                      icon={icon({ name: "user-secret" })}
                      className="info-icon"
                    />
                    <span>{video.user?.username}</span>
                  </Link>
                </div>
                <div className="playinfo">
                  <FontAwesomeIcon
                    icon={icon({ name: "circle-play", style: "regular" })}
                    className="info-icon"
                  />
                  {changeNum(number)}
                  <FontAwesomeIcon
                    icon={icon({ name: "comment-dots", style: "regular" })}
                    className="info-icon"
                    style={{ marginLeft: "10px" }}
                  />
                  {changeNum(video.totalComments)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
const VideoPage = () => {
  return (
    <div className="video-container">
      <div className="container-md">
        <div className="video-content">
          <div className="left-area">
            <Video />
          </div>
          <div className="right-area">
            <div className="up-user-info">
              <UserCard />
            </div>
            <div className="recommend-video">
              <Recommand />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPage;
