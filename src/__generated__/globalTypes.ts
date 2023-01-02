/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Sort {
  Hot = "Hot",
  Newest = "Newest",
}

export interface CreateCommentInput {
  playload: string;
  videoId: number;
}

export interface CreateReplyInput {
  playload: string;
  rootCommentId: number;
  parentCommentId?: number | null;
}

export interface CreateVideoInput {
  title: string;
  fileUrl: string;
  coverUrl: string;
  introduction?: string | null;
  categoryId: number;
}

export interface RecommandInput {
  videoId: number;
  take?: number | null;
}

export interface SeeCommentsInput {
  take: number;
  page: number;
  videoId: number;
  sort: Sort;
}

export interface SeeReplysInput {
  take: number;
  page: number;
  rootCommentId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
