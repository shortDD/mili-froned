import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getDate } from "../../utils/date";
import useDelComment from "../../hooks/useDelComment";
import useToggleLikeComment from "../../hooks/useToggleLikeComment";

const ReplyInfo = ({
  createdAt,
  isLike,
  likes,
  isMine,
  commentId,
  replyId,
  onReply,
  toggleLike,
}: {
  createdAt: string;
  isLike: boolean;
  likes: number;
  isMine: boolean;
  commentId?: number;
  replyId?: number;
  onReply: () => void;
  toggleLike: () => void;
}) => {
  const [delEvent] = useDelComment({ commentId, replyId });
  return (
    <div className="reply-info">
      <div className="createdAt r-item">{getDate(createdAt)}</div>
      <div className="likes r-item" onClick={toggleLike}>
        <FontAwesomeIcon
          icon={icon({ name: "thumbs-up" })}
          className={`likes-icon ${isLike ? "liked" : ""}`}
        />
        <span>{likes}</span>
      </div>
      <div className="reply-btn r-item" onClick={onReply}>
        回复
      </div>
      {isMine && (
        <div className="reply-del-btn r-item" onClick={delEvent}>
          删除
        </div>
      )}
    </div>
  );
};
export default ReplyInfo;
