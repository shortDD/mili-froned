import { useQuery } from "@apollo/client";
import { IonIcon } from "@ionic/react";
import { SEED_FEED } from "../../apollo-hooks";
import { seedFeed } from "../../__generated__/seedFeed";
import "./index.scss";
const Feed = () => {
  const { data: feeds, loading } = useQuery<seedFeed>(SEED_FEED);
  const arr = new Array(20).fill(1);
  console.log(arr);

  return (
    <div className="video-warp">
      {loading
        ? arr.map((_, index) => (
            <div className="video-card" key={index}>
              <div className={`video-template ${false ? "hide" : ""}`}>
                <div className="video-template-cover"></div>
                <div className="video-template-info">
                  <div className="video-template-info-text"></div>
                  <div className="video-template-info-text-short"></div>
                  <div className="video-template-info-light"></div>
                </div>
              </div>
            </div>
          ))
        : feeds?.seedFeed.videos?.map((video, index) => (
            <div className="video-card" key={index}>
              <div className={`video-template ${true ? "hide" : ""}`}>
                <div className="video-template-cover"></div>
                <div className="video-template-info">
                  <div className="video-template-info-text"></div>
                  <div className="video-template-info-text-short"></div>
                  <div className="video-template-info-light"></div>
                </div>
              </div>
              <div className="video-card-wrap">
                <a
                  className="video-link"
                  href={`http://localhost:3000/video:${video.id}`}
                >
                  <div className="video-image">
                    <img
                      src={video.coverUrl}
                      alt={video.title}
                      className="cover-image"
                    />
                    <div className="video-image-status">
                      <div className="status-left">
                        <IonIcon icon="play-circle-outline" color="#fff" />
                        <p>456</p>
                      </div>
                      <span>13:38</span>
                    </div>
                  </div>
                </a>
                <div className="video-info">
                  <h4 className="video-info-title">{video.title}</h4>
                  <div className="video-info-bottom">
                    <p className="sub-info">{video.user?.username}</p>
                    <p className="sub-info">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Feed;
