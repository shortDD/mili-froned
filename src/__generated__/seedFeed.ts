/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seedFeed
// ====================================================

export interface seedFeed_seedFeed_videos_user {
  __typename: "User";
  username: string;
  id: number;
}

export interface seedFeed_seedFeed_videos {
  __typename: "Video";
  id: number;
  title: string;
  coverUrl: string;
  user: seedFeed_seedFeed_videos_user | null;
  createdAt: any;
  totalComments: number;
}

export interface seedFeed_seedFeed {
  __typename: "SeedFeedOutput";
  ok: boolean;
  error: string | null;
  videos: seedFeed_seedFeed_videos[] | null;
}

export interface seedFeed {
  seedFeed: seedFeed_seedFeed;
}
