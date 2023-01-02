import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { SEE_CATEGORY } from "../../apollo-hooks";
import {
  seeCategory,
  seeCategoryVariables,
} from "../../__generated__/seeCategory";

const VideoByCategory = () => {
  const { pathname } = useLocation();
  const id = pathname.split(":")[1];
  const { data } = useQuery<seeCategory, seeCategoryVariables>(SEE_CATEGORY, {
    variables: { categoryId: Number(id) },
  });
  console.log(data);
  return <div>Category</div>;
};

export default VideoByCategory;
