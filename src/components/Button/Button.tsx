import "./index.scss";
interface IProps {
  children?: any;
  text?: string;
  bgColor: "pink" | "blue";
  onclick?: () => void;
}
const Button: React.FC<IProps> = ({ children, text, onclick, bgColor }) => {
  return (
    <div
      onClick={onclick}
      className="i-btn"
      style={{ backgroundColor: "#FF9494" }}
    >
      {children}
      {text && <span>{text}</span>}
    </div>
  );
};
export default Button;
