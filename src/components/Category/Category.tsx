import { useNavigate } from "react-router-dom";
import "./index.scss";
interface IProps {
  categoryId: number;
  name: string;
}
const Category: React.FC<IProps> = ({ name, categoryId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="category-item"
      onClick={() => {
        navigate(`/category:${categoryId}`);
      }}
    >
      {name}
    </div>
  );
};
export default Category;
