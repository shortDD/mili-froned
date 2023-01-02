import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { SEE_COMMENTS } from "../apollo-hooks";
import { sortState } from "../components/Comment/Comment";
import { Sort } from "../__generated__/globalTypes";
import {
  seeComments,
  seeCommentsVariables,
} from "../__generated__/seeComments";
const useLoadComment: (obj: any) => [
  () => void,
  () => void,
  {
    loadCommentsResult: seeComments | undefined;
    loading: boolean;
    sort: Sort;
  }
] = ({
  videoId,
  currentPage,
}: {
  videoId: number;
  currentPage: React.MutableRefObject<number>;
}) => {
  const {
    data: loadCommentsResult,
    loading,
    refetch,
  } = useQuery<seeComments, seeCommentsVariables>(SEE_COMMENTS, {
    variables: {
      input: {
        take: 20,
        videoId,
        page: 1,
        sort: sortState.current,
      },
    },
    fetchPolicy: "network-only",
  });
  const [sort, setSort] = useState(Sort.Hot);
  //热度/时间 请求事件
  const hotLoadEvent = async () => {
    if (sortState.current === Sort.Hot || loading) return;
    currentPage.current = 1;
    sortState.current = Sort.Hot;
    setSort(Sort.Hot);
    await refetch({
      input: {
        take: 20,
        videoId,
        page: 1,
        sort: sortState.current,
      },
    });
  };
  const newestLoadEvent = async () => {
    if (sortState.current === Sort.Newest || loading) return;
    currentPage.current = 1;
    sortState.current = Sort.Newest;
    setSort(Sort.Newest);
    await refetch({
      input: {
        take: 20,
        videoId,
        page: 1,
        sort: sortState.current,
      },
    });
  };
  return [hotLoadEvent, newestLoadEvent, { loadCommentsResult, loading, sort }];
};
export default useLoadComment;
