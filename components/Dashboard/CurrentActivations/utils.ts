export const toTimeString = (isoDate: string) => {
  const currentDate = new Date();
  const date = new Date(isoDate);
  const diff = date.getTime() - currentDate.getTime();
  const diffDate = new Date(diff);
  const seconds = diffDate.getSeconds();
  const minutes = diffDate.getMinutes();
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
