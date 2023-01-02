import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import React from "react";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import "./index.scss";
const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

const VideoPlay = React.memo(({ fileUrl }: { fileUrl: string }) => {
  const videoRef = useRef<any>();
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(1);
  const setProgressEvent = () => {
    const percentage = videoRef.current.currentTime / videoRef.current.duration;
    setCurrentTime(videoRef.current.currentTime);
    setProgress(percentage);
  };
  const togglePause = () => {
    if (videoRef.current.paused) {
      setPaused(false);
      videoRef.current.play();
    } else {
      setPaused(true);
      videoRef.current.pause();
    }
  };
  const volumeChange = (e: any) => {
    if (e.nativeEvent.offsetY < 0) return;
    const scaleY = (60 - e.nativeEvent.offsetY) / 60;
    let vol = Math.floor(scaleY * 100) / 100;
    if (vol === 0.01) vol = 0;
    videoRef.current.volume = vol;
    setVolume(vol);
  };
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoContainer = useRef<any>();
  return (
    <div className="video-player" ref={videoContainer}>
      <video
        preload="auto"
        ref={videoRef}
        src={fileUrl}
        onTimeUpdate={setProgressEvent}
        onClick={togglePause}
        onLoadedMetadata={() => {
          videoRef.current.volume = 0.5;
          setCurrentTime(videoRef.current.currentTime);
          setDuration(videoRef.current.duration);
        }}
      ></video>
      <div className="video-controller">
        <div
          className="progress-bar"
          onClick={(e) => {
            const percent = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
            videoRef.current.currentTime = videoRef.current.duration * percent;
            videoRef.current.play();
            setPaused(false);
            setProgress(percent);
          }}
        >
          <div
            className="progress-bar-entity"
            style={{ transform: `scaleX(${progress})` }}
          ></div>
        </div>
        <div className="video-controller-left">
          <div className="pause-video c-item" onClick={togglePause}>
            {paused ? (
              <FontAwesomeIcon icon={icon({ name: "play" })} size="lg" />
            ) : (
              <FontAwesomeIcon icon={icon({ name: "pause" })} size="lg" />
            )}
          </div>
          <div className="video-time c-item">
            <span>{dayjs(currentTime * 1000).format("mm:ss")}</span>
            <span>/</span>
            <span>{dayjs(duration * 1000).format("mm:ss")}</span>
          </div>
        </div>
        <div className="video-controller-right">
          <div className="speed c-item">
            <div className="speed-btn c-btn">倍速</div>
            <div className="speed-box">
              {speeds.map((spd, index) => (
                <div
                  className={`${spd === speed ? "active" : ""} speed-item`}
                  key={index}
                  onClick={() => {
                    videoRef.current.playbackRate = spd;
                    setSpeed(spd);
                  }}
                >
                  {spd}x
                </div>
              ))}
            </div>
          </div>
          <div className="volume c-item">
            <div className="volume-btn c-btn">
              {volume === 0 ? (
                <FontAwesomeIcon
                  icon={icon({ name: "volume-xmark" })}
                  size="lg"
                  onClick={() => setVolume(0.5)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={icon({ name: "volume-high" })}
                  size="lg"
                  onClick={() => {
                    setVolume(0);
                  }}
                />
              )}
            </div>
            <div className="volume-box">
              <div className="volume-num">{Math.floor(100 * volume)}</div>
              <div
                className="volume-progress"
                onMouseMove={(e) => {
                  if (e.buttons === 1) {
                    volumeChange(e);
                  }
                }}
                onClick={volumeChange}
              >
                <div className="strip-wrap">
                  <div
                    className="strip"
                    style={{ transform: `scaleY(${volume})` }}
                  ></div>
                </div>
                <div
                  className="spot"
                  style={{
                    transform: `translateY(${-volume * 48 + "px"})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="full-screen c-item"
            onClick={() => {
              if (document.fullscreenElement !== null) {
                document.exitFullscreen();
              } else {
                // The document is not in fullscreen mode
                videoContainer.current.requestFullscreen();
              }
            }}
          >
            <div className="c-btn">
              <FontAwesomeIcon
                icon={icon({ name: "expand" })}
                size="lg"
                onClick={() => setVolume(0.5)}
              />
            </div>
          </div>
        </div>
        <div className="video-controller-bg-shadow"></div>
      </div>
      <div className="paused-icon">
        {paused && (
          <IonIcon
            icon="caret-forward-circle"
            style={{
              width: "80px",
              height: "80px",
              color: "gray",
              opacity: "0.5",
            }}
          />
        )}
      </div>
    </div>
  );
});
export default VideoPlay;
