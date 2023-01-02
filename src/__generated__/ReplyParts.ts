/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReplyParts
// ====================================================

export interface ReplyParts_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  username: string;
  bio: string | null;
  isMe: boolean;
  isfollowing: boolean;
  totalFollowings: number;
  totalFolloweds: number;
  posts: number;
}

export interface ReplyParts {
  __typename: "Reply";
  id: number;
  user: ReplyParts_user;
  isMine: boolean;
  playload: string;
  likes: number;
  isLike: boolean;
  createdAt: any;
}
