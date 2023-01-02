import { TOKEN_KEY } from "../constants";

const getToken = () => localStorage.getItem(TOKEN_KEY);

const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

const delToken = () => localStorage.removeItem(TOKEN_KEY);

const changeNum = (num: number) => {
  const ttd = num / 10000;
  return ttd > 1 ? ttd.toFixed(1) + "万" : num;
};
export { getToken, setToken, delToken, changeNum };
