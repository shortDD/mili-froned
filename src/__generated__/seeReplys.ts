/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeeReplysInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: seeReplys
// ====================================================

export interface seeReplys_seeReplys_replys_user {
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

export interface seeReplys_seeReplys_replys {
  __typename: "Reply";
  id: number;
  user: seeReplys_seeReplys_replys_user;
  isMine: boolean;
  playload: string;
  likes: number;
  isLike: boolean;
  createdAt: any;
  rootCommentId: number;
}

export interface seeReplys_seeReplys {
  __typename: "SeeReplysOutput";
  ok: boolean;
  error: string | null;
  replys: seeReplys_seeReplys_replys[] | null;
}

export interface seeReplys {
  seeReplys: seeReplys_seeReplys;
}

export interface seeReplysVariables {
  input: SeeReplysInput;
}
