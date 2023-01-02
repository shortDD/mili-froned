import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    bio
    isMe
    isfollowing
    totalFollowings
    totalFolloweds
    posts
  }
`;
export const REPLY_FRAGMENT = gql`
  fragment ReplyParts on Reply {
    id
    user {
      ...UserParts
    }
    isMine
    playload
    likes
    isLike
    createdAt
  }
  ${USER_FRAGMENT}
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentParts on Comment {
    id
    playload
    likes
    isMine
    totalReplys
    isLike
    createdAt
    user {
      ...UserParts
    }
    replys {
      ...ReplyParts
    }
  }
  ${USER_FRAGMENT}
  ${REPLY_FRAGMENT}
`;
