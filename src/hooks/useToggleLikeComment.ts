import { gql, useMutation } from "@apollo/client";
import { TOGGLE_LIKE_COMMENT } from "../apollo-hooks";
import {
  toggleLikeComment,
  toggleLikeCommentVariables,
} from "../__generated__/toggleLikeComment";

const useToggleLikeComment = ({
  commentId,
  replyId,
}: {
  commentId?: number;
  replyId?: number;
}): [() => void] => {
  const [likeComment, { loading }] = useMutation<
    toggleLikeComment,
    toggleLikeCommentVariables
  >(TOGGLE_LIKE_COMMENT, {
    update: (cache, { data }) => {
      if (data?.toggleLikeComment.ok) {
        if (commentId) {
          const { isLike } = cache.readFragment({
            id: `Comment:${commentId}`,
            fragment: gql`
              fragment CommentLike on Comment {
                isLike
              }
            `,
          }) as { isLike: boolean };
          cache.modify({
            id: `Comment:${commentId}`,
            fields: {
              isLike: (pre) => !pre,
              likes: (pre) => (isLike ? pre - 1 : pre + 1),
            },
          });
        } else {
          const { isLike } = cache.readFragment({
            id: `Reply:${replyId}`,
            fragment: gql`
              fragment ReplyLike on Reply {
                isLike
              }
            `,
          }) as { isLike: boolean };
          cache.modify({
            id: `Reply:${replyId}`,
            fields: {
              isLike: (pre) => !pre,
              likes: (pre) => (isLike ? pre - 1 : pre + 1),
            },
          });
        }
      }
    },
  });
  const toggleLikeEvent = () => {
    if (loading) return;
    if (commentId && replyId) {
      console.log("点赞只接受1个参数");
      return;
    }
    likeComment({
      variables: {
        ...(commentId && { commentId }),
        ...(replyId && { replyId }),
      },
    });
  };
  return [toggleLikeEvent];
};

export default useToggleLikeComment;
