import { useMutation, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { CREATE_COMMENT, CREATE_REPLY, SEE_VIDEO } from "../apollo-hooks";
import { replyBoxIndex, sortState } from "../components/Comment/Comment";
import { updateCommentsCache } from "../utils/updateApolloCache";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import {
  createReply,
  createReplyVariables,
} from "../__generated__/createReply";
import useVideoId from "./useVideoId";

const useCreateComment = (
  rootCommentId?: number,
  parentCommentId?: number
): [
  playload: string,
  setPlayload: React.Dispatch<React.SetStateAction<string>>,
  event: () => void
] => {
  const videoId = useVideoId();

  const index = useReactiveVar(replyBoxIndex);
  const [playload, setPlayload] = useState("");
  const [createComment, { loading: createCommentLoading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT, {
    update: (cache, { data }) => {
      if (!data?.createComment.ok) return;
      const newComment = data.createComment.comment;
      updateCommentsCache(cache, sortState.current, videoId, (comments) => [
        { ...newComment! },
        ...comments,
      ]);
      cache.updateQuery(
        { query: SEE_VIDEO, variables: { id: videoId } },
        (videoData) => {
          if (videoData) {
            const result = {
              seeVideo: {
                ...videoData.seeVideo,
                video: {
                  ...videoData.seeVideo.video,
                  totalComments: videoData.seeVideo.video.totalComments + 1,
                  totalRootComments:
                    videoData.seeVideo.video.totalRootComments + 1,
                },
              },
            };
            return result;
          }
        }
      );
      setPlayload("");
    },
  });
  const createCommentEvent = () => {
    if (createCommentLoading || !playload || !videoId) return;
    createComment({
      variables: {
        input: {
          videoId,
          playload,
        },
      },
    });
  };

  const [createReply, { loading: createReplyLoading }] = useMutation<
    createReply,
    createReplyVariables
  >(CREATE_REPLY, {
    update: (cache, { data }) => {
      if (!data?.createReply.ok) return;
      const newReply = data.createReply.reply;
      cache.modify({
        id: `Comment:${rootCommentId}`,
        fields: {
          replys: (old) => [...old, { __ref: `Reply:${newReply?.id}` }],
          totalReplys: (old) => old + 1,
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
                  totalComments: videoData.seeVideo.video.totalComments + 1,
                },
              },
            };
            return result;
          }
        }
      );
      setPlayload("");
    },
  });
  const createReplyEvent = () => {
    if (createReplyLoading || !playload || !rootCommentId) return;
    createReply({
      variables: {
        input: {
          parentCommentId,
          rootCommentId,
          playload: parentCommentId
            ? `${index.placeholder} :${playload}`
            : playload,
        },
      },
    });
  };
  let postEvent = rootCommentId ? createReplyEvent : createCommentEvent;
  return [playload, setPlayload, postEvent];
};
export default useCreateComment;
