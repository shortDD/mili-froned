import Avatar from "../Avatar/Avatar";
import "./index.scss";
import { seeComments_seeComments_comments_replys } from "../../__generated__/seeComments";
import ReplyInfo from "../ReplyInfo/ReplyInfo";
import PostComment from "../PostComment/PostComment";
import { useReactiveVar } from "@apollo/client";
import { replyBoxIndex } from "../Comment/Comment";
import useShowMoreComments from "../../hooks/useShowMoreComments";
import Pagination from "../Pagination/Pagination";
import useToggleLikeComment from "../../hooks/useToggleLikeComment";

interface SubReplyProps {
  replyId: number;
  avatarUrl: string | null;
  username: string;
  playload: string;
  createdAt: string;
  likes: number;
  isLike: boolean;
  isMine: boolean;
  commentId: number;
}
const SubReply: React.FC<SubReplyProps> = ({
  replyId,
  avatarUrl,
  username,
  playload,
  createdAt,
  likes,
  isLike,
  commentId,
  isMine,
}) => {
  const parentReplyEvent = () => {
    replyBoxIndex({
      placeholder: `回复 @${username}`,
      rootCommentId: commentId,
      parentCommentId: replyId,
    });
  };
  const [toggleLike] = useToggleLikeComment({ replyId });

  return (
    <div className="sub-reply-item" key={replyId}>
      <div className="sub-user-info">
        <div className="sub-reply-avatar">
          <Avatar size="xs" avatarUrl={avatarUrl} />
        </div>
        <div className="sub-username">{username}</div>
      </div>
      <span className="reply-content-container">
        <span className="reply-content">{playload}</span>
      </span>
      <div className="sub-reply-info">
        <ReplyInfo
          createdAt={createdAt}
          isLike={isLike}
          likes={likes}
          replyId={replyId}
          commentId={commentId}
          isMine={isMine}
          onReply={parentReplyEvent}
          toggleLike={toggleLike}
        />
      </div>
    </div>
  );
};

interface IProps {
  playload: string;
  username: string;
  avatarUrl: string | null;
  createdAt: string;
  likes: number;
  replys: seeComments_seeComments_comments_replys[] | null;
  isLike: boolean;
  isMine: boolean;
  commentId: number;
  totalReplys: number;
}
const Reply: React.FC<IProps> = ({
  playload,
  username,
  avatarUrl,
  createdAt,
  likes,
  replys,
  isLike,
  isMine,
  commentId,
  totalReplys,
}) => {
  const index = useReactiveVar(replyBoxIndex);
  const rootReplyEvent = () => {
    if (index.rootCommentId === commentId) {
      replyBoxIndex({
        placeholder: "",
        rootCommentId: 0,
        parentCommentId: 0,
      });
      return;
    }
    replyBoxIndex({
      placeholder: `回复 @${username}`,
      rootCommentId: commentId,
      parentCommentId: 0,
    });
  };
  const [showMore, seeReplysEvent, paginaiton] = useShowMoreComments({
    rootCommentId: commentId,
    totalReplys,
  });
  const [toggleLike] = useToggleLikeComment({ commentId });

  return (
    <div className="reply-wrap">
      <div className="root-reply-container">
        <div className="root-reply-avatar">
          <Avatar size="lg" avatarUrl={avatarUrl} />
        </div>
        <div className="content-wrap">
          <span className="username">{username}</span>
          <div className="root-reply">
            <div className="playload">{playload}</div>
            <ReplyInfo
              createdAt={createdAt}
              isLike={isLike}
              likes={likes}
              isMine={isMine}
              commentId={commentId}
              onReply={rootReplyEvent}
              toggleLike={toggleLike}
            />
          </div>
        </div>
      </div>
      <div className="sub-reply-container">
        <div className="sub-reply-list">
          {replys &&
            replys.length > 0 &&
            replys.map((reply) => (
              <SubReply
                key={reply.id}
                replyId={reply.id}
                avatarUrl={reply.user.avatar}
                username={reply.user.username}
                playload={reply.playload}
                createdAt={reply.createdAt}
                likes={reply.likes}
                isLike={reply.isLike}
                isMine={reply.isMine}
                commentId={commentId}
              />
            ))}
        </div>
        {!showMore && paginaiton.length > 1 && (
          <Pagination paginaiton={paginaiton} />
        )}
        {showMore && totalReplys > 3 && (
          <div
            style={{
              paddingLeft: "8px",
              fontSize: "13px",
              color: "gray",
            }}
          >
            <span>共{totalReplys}条回复，</span>
            <span className="view-more-btn" onClick={seeReplysEvent}>
              点击查看
            </span>
          </div>
        )}
        {index.rootCommentId === commentId && (
          <div className="sub-reply-box">
            <PostComment
              placeholder={index.placeholder}
              rootCommentId={index.rootCommentId}
              parentCommentId={index.parentCommentId}
            />
          </div>
        )}
      </div>
      <div className="bottom-line"></div>
    </div>
  );
};
export default Reply;
