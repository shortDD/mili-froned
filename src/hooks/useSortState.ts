import { useRef } from "react";
import { Sort } from "../__generated__/globalTypes";

const useSortState = () => {
  const sortState = useRef(Sort.Hot);
  return sortState;
};

export default useSortState;
