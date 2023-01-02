/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment_comment_user {
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

export interface createComment_createComment_comment_replys_user {
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

export interface createComment_createComment_comment_replys {
  __typename: "Reply";
  id: number;
  user: createComment_createComment_comment_replys_user;
  isMine: boolean;
  playload: string;
  likes: number;
  isLike: boolean;
  createdAt: any;
}

export interface createComment_createComment_comment {
  __typename: "Comment";
  id: number;
  playload: string;
  likes: number;
  isMine: boolean;
  totalReplys: number;
  isLike: boolean;
  createdAt: any;
  user: createComment_createComment_comment_user;
  replys: createComment_createComment_comment_replys[] | null;
}

export interface createComment_createComment {
  __typename: "CreateCommentOutput";
  ok: boolean;
  error: string | null;
  comment: createComment_createComment_comment | null;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  input: CreateCommentInput;
}
