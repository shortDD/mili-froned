import { useState } from "react";

const useDataUrl: () => [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (file: any) => void
] = () => {
  const [cover, setCover] = useState("");

  const setCoverByFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      setCover(e.target?.result as string);
    };
  };
  return [cover, setCover, setCoverByFile];
};
export default useDataUrl;
