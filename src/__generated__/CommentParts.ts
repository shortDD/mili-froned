/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentParts
// ====================================================

export interface CommentParts_user {
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

export interface CommentParts_replys_user {
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

export interface CommentParts_replys {
  __typename: "Reply";
  id: number;
  user: CommentParts_replys_user;
  isMine: boolean;
  playload: string;
  likes: number;
  isLike: boolean;
  createdAt: any;
}

export interface CommentParts {
  __typename: "Comment";
  id: number;
  playload: string;
  likes: number;
  isMine: boolean;
  totalReplys: number;
  isLike: boolean;
  createdAt: any;
  user: CommentParts_user;
  replys: CommentParts_replys[] | null;
}
