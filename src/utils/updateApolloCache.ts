import { ApolloCache } from "@apollo/client";
import { SEE_COMMENTS } from "../apollo-hooks";
import { Sort } from "../__generated__/globalTypes";
import { seeComments_seeComments_comments } from "../__generated__/seeComments";

const updateCommentsCache = (
  cache: ApolloCache<object>,
  sort: Sort,
  videoId: number,
  getNewComments: (
    oldComments: seeComments_seeComments_comments[]
  ) => seeComments_seeComments_comments[]
) => {
  cache.updateQuery(
    {
      query: SEE_COMMENTS,
      variables: { input: { take: 20, videoId, page: 1, sort } },
    },
    (firstLoadData) => {
      const seeComments = firstLoadData.seeComments;
      const comments = seeComments.comments;
      return {
        seeComments: {
          ...seeComments,
          comments: getNewComments(comments),
        },
      };
    }
  );
};

// const updateCommentCache = (
//   cache: ApolloCache<object>,
//   rootCommentId: number,
//   getNewComment: (
//     oldComment: seeComments_seeComments_comments
//   ) => seeComments_seeComments_comments
// ) => {
//   cache.modify({
//     id: `Comment:${rootCommentId}`,
//     fields: {},
//   });
// };
export { updateCommentsCache };
// [...comments, ...newData.seeComments.comments],
