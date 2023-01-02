/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeVideo
// ====================================================

export interface seeVideo_seeVideo_video {
  __typename: "Video";
  title: string;
  fileUrl: string;
  coverUrl: string;
  introduction: string | null;
  createdAt: any;
  isLike: boolean;
  likes: number;
  totalComments: number;
  totalRootComments: number;
}

export interface seeVideo_seeVideo {
  __typename: "SeeVideoOutput";
  ok: boolean;
  error: string | null;
  video: seeVideo_seeVideo_video | null;
}

export interface seeVideo {
  seeVideo: seeVideo_seeVideo;
}

export interface seeVideoVariables {
  id: number;
}
