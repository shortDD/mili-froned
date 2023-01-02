/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allCategory
// ====================================================

export interface allCategory_allCategory_categories {
  __typename: "PartOnCategory";
  id: number;
  name: string;
}

export interface allCategory_allCategory {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: allCategory_allCategory_categories[];
}

export interface allCategory {
  allCategory: allCategory_allCategory;
}
