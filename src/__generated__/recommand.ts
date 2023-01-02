/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecommandInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: recommand
// ====================================================

export interface recommand_recommand_videos_user {
  __typename: "User";
  username: string;
}

export interface recommand_recommand_videos {
  __typename: "Video";
  id: number;
  title: string;
  fileUrl: string;
  coverUrl: string;
  totalComments: number;
  user: recommand_recommand_videos_user | null;
}

export interface recommand_recommand {
  __typename: "RecommandOutput";
  ok: boolean;
  error: string | null;
  videos: recommand_recommand_videos[] | null;
}

export interface recommand {
  recommand: recommand_recommand;
}

export interface recommandVariables {
  input: RecommandInput;
}
