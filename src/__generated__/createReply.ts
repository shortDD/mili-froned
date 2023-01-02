/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReplyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createReply
// ====================================================

export interface createReply_createReply_reply_user {
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

export interface createReply_createReply_reply {
  __typename: "Reply";
  id: number;
  user: createReply_createReply_reply_user;
  isMine: boolean;
  playload: string;
  likes: number;
  isLike: boolean;
  createdAt: any;
  rootCommentId: number;
}

export interface createReply_createReply {
  __typename: "CreateReplyOutput";
  ok: boolean;
  error: string | null;
  reply: createReply_createReply_reply | null;
}

export interface createReply {
  createReply: createReply_createReply;
}

export interface createReplyVariables {
  input: CreateReplyInput;
}
