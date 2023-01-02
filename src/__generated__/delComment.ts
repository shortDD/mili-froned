/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delComment
// ====================================================

export interface delComment_delComment {
  __typename: "DelCommentOutput";
  ok: boolean;
  error: string | null;
}

export interface delComment {
  delComment: delComment_delComment;
}

export interface delCommentVariables {
  commentId: number;
}
