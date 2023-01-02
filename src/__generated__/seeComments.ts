/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeeCommentsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: seeComments
// ====================================================

export interface seeComments_seeComments_comments_user {
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

export interface seeComments_seeComments_comments_replys_user {
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

export interface seeComments_seeComments_comments_replys {
  __typename: "Reply";
  id: number;
  user: seeComments_seeComments_comments_replys_user;
  isMine: boolean;
  playload: string;
  likes: number;
  isLike: boolean;
  createdAt: any;
}

export interface seeComments_seeComments_comments {
  __typename: "Comment";
  id: number;
  playload: string;
  likes: number;
  isMine: boolean;
  totalReplys: number;
  isLike: boolean;
  createdAt: any;
  user: seeComments_seeComments_comments_user;
  replys: seeComments_seeComments_comments_replys[] | null;
}

export interface seeComments_seeComments {
  __typename: "SeeCommentsOutput";
  ok: boolean;
  error: string | null;
  comments: seeComments_seeComments_comments[];
}

export interface seeComments {
  seeComments: seeComments_seeComments;
}

export interface seeCommentsVariables {
  input: SeeCommentsInput;
}
