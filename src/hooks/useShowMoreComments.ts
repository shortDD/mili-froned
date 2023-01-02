import { useApolloClient, useLazyQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { SEE_REPLYS } from "../apollo-hooks";
import { seeReplys, seeReplysVariables } from "../__generated__/seeReplys";

const useShowMoreComments = ({
  rootCommentId,
  totalReplys,
}: {
  rootCommentId: number;
  totalReplys: number;
}): [boolean, () => void, (() => void)[]] => {
  const [showMore, setShowMore] = useState(true);
  const { cache } = useApolloClient();
  const page = useRef(1);
  const [seeReplys, { loading }] = useLazyQuery<seeReplys, seeReplysVariables>(
    SEE_REPLYS,
    {
      onCompleted: (data) => {
        if (data.seeReplys.ok) {
          const newReplys = data.seeReplys.replys?.map((reply) => ({
            __ref: `Reply:${reply.id}`,
          }));
          cache.modify({
            id: `Comment:${rootCommentId}`,
            fields: {
              replys() {
                return newReplys;
              },
            },
          });
        }
      },
    }
  );
  const changePage = (value: number) => {
    page.current = value;
  };
  const totalPages = Math.ceil(totalReplys / 10);
  const paginaiton = (() => {
    const paginaiton = [];
    for (let i = 1; i <= totalPages; i++) {
      const getReplysByPage = () => {
        if (page.current === i) return;
        changePage(i);
        seeReplysEvent();
      };
      paginaiton.push(getReplysByPage);
    }
    return paginaiton;
  })();
  const seeReplysEvent = () => {
    setShowMore(false);
    if (loading) return;
    seeReplys({
      variables: {
        input: {
          rootCommentId,
          take: 10,
          page: page.current,
        },
      },
    });
  };
  return [showMore, seeReplysEvent, paginaiton];
};

export default useShowMoreComments;
