import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../apollo-hooks";
import useCreateComment from "../../hooks/useCreateComment";
import { me } from "../../__generated__/me";
import Avatar from "../Avatar/Avatar";
import "./index.scss";
interface IProps {
  placeholder?: string;
  rootCommentId?: number;
  parentCommentId?: number;
}
const PostComment: React.FC<IProps> = ({
  placeholder = "发一条友善的评论",
  rootCommentId,
  parentCommentId,
}) => {
  const { data } = useQuery<me>(ME_QUERY);
  const [playload, setPlayload, postEvent] = useCreateComment(
    rootCommentId,
    parentCommentId
  );
  return (
    <div className="reply-box-post">
      <div className="reply-box-avatar">
        <Avatar avatarUrl={data?.me.avatar!} size="lg" />
      </div>
      <div className="post-input">
        <textarea
          value={playload}
          placeholder={placeholder}
          onChange={(e) => {
            let value = e.target.value;
            setPlayload(value);
          }}
        ></textarea>
      </div>
      <div className="post-btn" onClick={postEvent}>
        <div className="post-btn-text" style={{ userSelect: "none" }}>
          发布
        </div>
      </div>
    </div>
  );
};

export default PostComment;
