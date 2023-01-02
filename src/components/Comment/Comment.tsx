import "./index.scss";
import React, { useRef } from "react";
import PostComment from "../PostComment/PostComment";
import Reply from "../Reply/Reply";
import NoData from "../No-Data/NoData";
import { Sort } from "../../__generated__/globalTypes";
import useScrollBottomQuery from "../../hooks/useScrollBottomQuery";
import useLoadComment from "../../hooks/useLoadComment";
import useScrollThreshold from "../../hooks/useScrollThreshold";
import { makeVar } from "@apollo/client";
export const replyBoxIndex = makeVar({
  placeholder: "",
  rootCommentId: 0,
  parentCommentId: 0,
});
export let sortState = {
  current: Sort.Hot,
};
interface IProps {
  videoId: number;
  totalComments: number;
  totalRootComments: number;
}
const Comment: React.FC<IProps> = React.memo(
  ({ videoId, totalComments, totalRootComments }) => {
    const totalPages = Math.ceil(totalRootComments / 20);
    const currentPage = useRef<number>(1);
    //首次加载评论请求
    const [hot, newest, { loadCommentsResult, loading, sort }] = useLoadComment(
      {
        videoId,
        currentPage,
      }
    );
    //滚动底部发送评论请求
    const { reLoading } = useScrollBottomQuery({
      max: totalPages,
      videoId,
      sort: sortState.current,
      currentPage,
    });
    //滚动到阈值 展示回复框
    const moldReplyBox = useRef<any>();
    const trackReplyBox = useRef<any>();
    const [show] = useScrollThreshold({
      trackElement: trackReplyBox,
      moldElement: moldReplyBox,
    });
    // if (!loadCommentsResult) return <NoData text="没有更多评论" />;
    return (
      <div className="video-comment">
        <div className="video-comment-title-wrap">
          <div className="comment-num">
            <h3>评论</h3>
            <span>{totalComments}</span>
          </div>
          <div className="comment-sort">
            <div
              className={`hot ${sort === Sort.Hot ? "selected" : ""}`}
              onClick={hot}
            >
              最热
            </div>
            <div> | </div>
            <div
              className={`newest ${sort === Sort.Newest ? "selected" : ""}`}
              onClick={newest}
            >
              最新
            </div>
          </div>
        </div>
        <div className="reply-box" ref={moldReplyBox} id="top-reply">
          <PostComment />
        </div>
        <div className="video-comment-main-wrap">
          <div className="reply-list">
            {loadCommentsResult?.seeComments.comments.map((comment, index) => (
              <Reply
                key={index}
                playload={comment.playload}
                username={comment.user.username}
                avatarUrl={comment.user.avatar}
                createdAt={comment.createdAt}
                likes={comment.likes}
                replys={comment.replys}
                isLike={comment.isLike}
                isMine={comment.isMine}
                commentId={comment.id}
                totalReplys={comment.totalReplys}
              />
            ))}
          </div>
          {show && (
            <div
              className="bottom-reply-box"
              id="bottom-reply"
              style={{ width: `${moldReplyBox.current.offsetWidth}px` }}
              ref={trackReplyBox}
            >
              <PostComment />
            </div>
          )}
          {(reLoading || loading) && <div>正在加载....</div>}
          {loadCommentsResult?.seeComments.comments.length! >=
            totalRootComments && <NoData text="没有更多评论" />}
        </div>
      </div>
    );
  }
);

export default Comment;
