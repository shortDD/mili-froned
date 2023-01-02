/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleLikeComment
// ====================================================

export interface toggleLikeComment_toggleLikeComment {
  __typename: "ToggleLikeCommentOutput";
  ok: boolean;
  error: string | null;
}

export interface toggleLikeComment {
  toggleLikeComment: toggleLikeComment_toggleLikeComment;
}

export interface toggleLikeCommentVariables {
  commentId?: number | null;
  replyId?: number | null;
}
