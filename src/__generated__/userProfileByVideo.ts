/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfileByVideo
// ====================================================

export interface userProfileByVideo_userProfileByVideo_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
  bio: string | null;
  isMe: boolean;
  isfollowing: boolean;
  totalFollowings: number;
  totalFolloweds: number;
}

export interface userProfileByVideo_userProfileByVideo {
  __typename: "UserProfileByVideoOutput";
  ok: boolean;
  error: string | null;
  user: userProfileByVideo_userProfileByVideo_user | null;
}

export interface userProfileByVideo {
  userProfileByVideo: userProfileByVideo_userProfileByVideo;
}

export interface userProfileByVideoVariables {
  videoId: number;
}
