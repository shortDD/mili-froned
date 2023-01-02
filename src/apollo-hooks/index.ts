import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT, REPLY_FRAGMENT } from "./fragment";

export const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;
export const ALL_CATEGORIES = gql`
  query allCategory {
    allCategory {
      ok
      error
      categories {
        id
        name
      }
    }
  }
`;
export const SEE_CATEGORY = gql`
  query seeCategory($categoryId: Int!) {
    seeCategory(categoryId: $categoryId) {
      ok
      error
      category {
        videos {
          id
        }
      }
    }
  }
`;

export const SEED_FEED = gql`
  query seedFeed {
    seedFeed {
      ok
      error
      videos {
        id
        title
        coverUrl
        user {
          username
          id
        }
        createdAt
        totalComments
      }
    }
  }
`;
export const POST_VIDEO = gql`
  mutation createVideo($input: CreateVideoInput!) {
    createVideo(input: $input) {
      ok
      error
    }
  }
`;

export const SEE_VIDEO = gql`
  query seeVideo($id: Int!) {
    seeVideo(id: $id) {
      ok
      error
      video {
        title
        fileUrl
        coverUrl
        introduction
        createdAt
        isLike
        likes
        totalComments
        totalRootComments
      }
    }
  }
`;

export const SEE_COMMENTS = gql`
  query seeComments($input: SeeCommentsInput!) {
    seeComments(input: $input) {
      ok
      error
      comments {
        ...CommentParts
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;
export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
      comment {
        ...CommentParts
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const CREATE_REPLY = gql`
  mutation createReply($input: CreateReplyInput!) {
    createReply(input: $input) {
      ok
      error
      reply {
        ...ReplyParts
        rootCommentId
      }
    }
  }
  ${REPLY_FRAGMENT}
`;

export const SEE_REPLYS = gql`
  query seeReplys($input: SeeReplysInput!) {
    seeReplys(input: $input) {
      ok
      error
      replys {
        ...ReplyParts
        rootCommentId
      }
    }
  }
  ${REPLY_FRAGMENT}
`;
export const DEL_COMMENT = gql`
  mutation delComment($commentId: Int!) {
    delComment(commentId: $commentId) {
      ok
      error
    }
  }
`;
export const DEL_REPLY = gql`
  mutation delReply($replyId: Int!) {
    delReply(replyId: $replyId) {
      ok
      error
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($videoId: Int!) {
    toggleLike(videoId: $videoId) {
      ok
      error
    }
  }
`;

export const TOGGLE_LIKE_COMMENT = gql`
  mutation toggleLikeComment($commentId: Int, $replyId: Int) {
    toggleLikeComment(commentId: $commentId, replyId: $replyId) {
      ok
      error
    }
  }
`;

export const USER_PROFILE_BY_VIDEO = gql`
  query userProfileByVideo($videoId: Int!) {
    userProfileByVideo(videoId: $videoId) {
      ok
      error
      user {
        id
        username
        avatar
        bio
        isMe
        isfollowing
        totalFollowings
        totalFolloweds
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($userId: Int!) {
    followUser(userId: $userId) {
      ok
      error
    }
  }
`;

export const RECOMMAND = gql`
  query recommand($input: RecommandInput!) {
    recommand(input: $input) {
      ok
      error
      videos {
        id
        title
        fileUrl
        coverUrl
        totalComments
        user {
          username
        }
      }
    }
  }
`;
