/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: followUser
// ====================================================

export interface followUser_followUser {
  __typename: "FollowUserOutput";
  ok: boolean;
  error: string | null;
}

export interface followUser {
  followUser: followUser_followUser;
}

export interface followUserVariables {
  userId: number;
}
