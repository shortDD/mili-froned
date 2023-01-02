const getVideoDuration = (url: string) => {
  return new Promise((resolve) => {
    const videoEl = document.createElement("video");
    videoEl.src = url;
    videoEl.addEventListener("loadedmetadata", function () {
      resolve({
        duration: videoEl.duration,
      });
    });
  });
};
export default getVideoDuration;
