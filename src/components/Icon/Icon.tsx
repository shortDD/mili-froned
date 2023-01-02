import { IonIcon } from "@ionic/react";
import "./icon.scss";
interface IProps {
  href?: string;
  iconname: string;
}
const Icon: React.FC<IProps> = ({
  href = "http://localhost:4000/graphql",
  iconname,
}) => {
  return (
    <a href="http://localhost:4000/graphql" className="icon-wrap">
      <IonIcon icon={iconname} style={{ width: "24px", height: "24px" }} />
    </a>
  );
};

export default Icon;
