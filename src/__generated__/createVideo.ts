/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateVideoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createVideo
// ====================================================

export interface createVideo_createVideo {
  __typename: "CreateUserOutput";
  ok: boolean;
  error: string | null;
}

export interface createVideo {
  createVideo: createVideo_createVideo;
}

export interface createVideoVariables {
  input: CreateVideoInput;
}
