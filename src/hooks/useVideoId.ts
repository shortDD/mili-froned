import { useLocation } from "react-router-dom";

const useVideoId = () => {
  const { pathname } = useLocation();
  const id = Number(pathname.split(":")[1]);
  return id;
};
export default useVideoId;
