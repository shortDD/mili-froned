import { useMutation } from "@apollo/client";
import { SEE_VIDEO, TOGGLE_LIKE } from "../apollo-hooks";
import { seeVideo } from "../__generated__/seeVideo";
import { toggleLike, toggleLikeVariables } from "../__generated__/toggleLike";

const useToggleLike = (
  videoId: number,
  callBack: (old: seeVideo) => seeVideo
): [() => void] => {
  const [likeVideo, { loading }] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE,
    {
      update: (cache, { data }) => {
        if (data?.toggleLike.ok) {
          cache.updateQuery<seeVideo>(
            { query: SEE_VIDEO, variables: { id: videoId } },
            (seeVideoData) => {
              if (seeVideoData) return callBack(seeVideoData);
            }
          );
        }
      },
    }
  );

  const LikeEvent = () => {
    if (loading) return;
    likeVideo({ variables: { videoId } });
  };

  return [LikeEvent];
};

export default useToggleLike;
