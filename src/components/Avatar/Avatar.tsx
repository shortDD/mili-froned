import { Link } from "react-router-dom";
import noAvatar from "../../images/noAvatar.webp";
const getSize = (size: string) => {
  switch (size) {
    case "xs":
      return { width: "24px", height: "24px" };
    case "sm":
      return { width: "35px", height: "35px" };
    case "md":
      return { width: "42px", height: "42px" };
    case "lg":
      return { width: "48px", height: "48px" };
    default:
      return { width: "35px", height: "35px" };
  }
};
interface IProps {
  avatarUrl: string | null | undefined;
  size?: "xs" | "sm" | "md" | "lg";
}
const Avatar: React.FC<IProps> = ({ avatarUrl, size = "sm" }) => {
  const avatarSize = getSize(size);
  return (
    <div className="avatar-wrap" style={{ ...avatarSize }}>
      <Link to="/profile:">
        <img
          src={avatarUrl ? avatarUrl : noAvatar}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </Link>
    </div>
  );
};

export default Avatar;
