/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCategory
// ====================================================

export interface seeCategory_seeCategory_category_videos {
  __typename: "Video";
  id: number;
}

export interface seeCategory_seeCategory_category {
  __typename: "Category";
  videos: seeCategory_seeCategory_category_videos[];
}

export interface seeCategory_seeCategory {
  __typename: "SeeCategoryOutput";
  ok: boolean;
  error: string | null;
  category: seeCategory_seeCategory_category;
}

export interface seeCategory {
  seeCategory: seeCategory_seeCategory;
}

export interface seeCategoryVariables {
  categoryId: number;
}
