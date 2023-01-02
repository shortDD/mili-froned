import dayjs from "dayjs";

export const getDate = (date: any) => dayjs(date).format("YY-MM-DD hh:mm");
