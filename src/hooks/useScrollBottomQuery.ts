import { useApolloClient, useLazyQuery } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { SEE_COMMENTS } from "../apollo-hooks";
import getScrollTop from "../utils/auto-getScrollTop";
import { updateCommentsCache } from "../utils/updateApolloCache";
import { Sort } from "../__generated__/globalTypes";
import {
  seeComments,
  seeCommentsVariables,
} from "../__generated__/seeComments";

const useScrollBottomQuery = ({
  max,
  sort,
  videoId,
  currentPage,
}: {
  max: number;
  sort: Sort;
  videoId: number;
  currentPage: React.MutableRefObject<number>;
}) => {
  const { cache } = useApolloClient();
  const [reLoadComments, { loading: reLoading }] = useLazyQuery<
    seeComments,
    seeCommentsVariables
  >(SEE_COMMENTS, {
    onCompleted: (data) => {
      if (data.seeComments.ok && data.seeComments.comments.length > 0) {
        updateCommentsCache(cache, sort, videoId, (oldComments) => [
          ...oldComments,
          ...data.seeComments.comments,
        ]);
      }
    },
  });

  //监听滚动，滚动到底部时发起评论请求
  const scrollReLoadEvent = () => {
    if (reLoading || currentPage.current >= max) return;
    reLoadComments({
      variables: {
        input: {
          take: 20,
          page: ++currentPage.current,
          videoId,
          sort,
        },
      },
    });
  };

  const reLoadRef = useRef(scrollReLoadEvent);
  useEffect(() => {
    function loadMoreComments(e: any) {
      let sTop = getScrollTop();
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.body.scrollHeight;
      if (sTop && sTop + clientHeight >= scrollHeight) {
        reLoadRef.current();
      }
    }
    window.addEventListener("scroll", loadMoreComments);
    return () => {
      window.removeEventListener("scroll", loadMoreComments);
    };
  }, []);

  return { reLoading };
};
export default useScrollBottomQuery;
