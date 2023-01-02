import { gql, useMutation } from "@apollo/client";
import { DEL_COMMENT, DEL_REPLY, SEE_VIDEO } from "../apollo-hooks";
import { delComment, delCommentVariables } from "../__generated__/delComment";
import { delReply, delReplyVariables } from "../__generated__/delReply";
import useVideoId from "./useVideoId";

const useDelComment = ({
  commentId,
  replyId,
}: {
  commentId?: number;
  replyId?: number;
}): [() => void] => {
  const videoId = useVideoId();
  const [delComment, { loading: delCommentLoading }] = useMutation<
    delComment,
    delCommentVariables
  >(DEL_COMMENT, {
    update: (cache, { data }) => {
      if (data?.delComment.ok) {
        const { totalReplys } = cache.readFragment({
          id: `Comment:${commentId}`,
          fragment: gql`
            fragment TotalReplys on Comment {
              totalReplys
            }
          `,
        }) as { totalReplys: number };
        cache.evict({ id: `Comment:${commentId}` });
        cache.updateQuery(
          { query: SEE_VIDEO, variables: { id: videoId } },
          (videoData) => {
            if (videoData) {
              const result = {
                seeVideo: {
                  ...videoData.seeVideo,
                  video: {
                    ...videoData.seeVideo.video,
                    totalComments:
                      videoData.seeVideo.video.totalComments - 1 - totalReplys,
                    totalRootComments:
                      videoData.seeVideo.video.totalRootComments - 1,
                  },
                },
              };
              return result;
            }
          }
        );
      }
    },
  });
  const [delReply, { loading: delReplyLoading }] = useMutation<
    delReply,
    delReplyVariables
  >(DEL_REPLY, {
    update: (cache, { data }) => {
      if (data?.delReply.ok) {
        console.log(commentId, replyId);
        cache.evict({ id: `Reply:${replyId}` });
        cache.modify({
          id: `Comment:${commentId}`,
          fields: {
            replys: (replys) => {
              return replys.filter((reply: any) => reply.id !== replyId);
            },
          },
        });
        cache.updateQuery(
          { query: SEE_VIDEO, variables: { id: videoId } },
          (videoData) => {
            if (videoData) {
              const result = {
                seeVideo: {
                  ...videoData.seeVideo,
                  video: {
                    ...videoData.seeVideo.video,
                    totalComments: videoData.seeVideo.video.totalComments - 1,
                  },
                },
              };
              return result;
            }
          }
        );
      }
    },
  });

  const delCommentEvent = () => {
    if (delCommentLoading || !commentId) return;
    delComment({
      variables: { commentId },
    });
  };
  const delReplyEvent = () => {
    if (delReplyLoading || !replyId) return;
    delReply({
      variables: { replyId },
    });
  };
  const delEvent = replyId ? delReplyEvent : delCommentEvent;

  return [delEvent];
};

export default useDelComment;
