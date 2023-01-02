/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delReply
// ====================================================

export interface delReply_delReply {
  __typename: "DelReplyOutput";
  ok: boolean;
  error: string | null;
}

export interface delReply {
  delReply: delReply_delReply;
}

export interface delReplyVariables {
  replyId: number;
}
