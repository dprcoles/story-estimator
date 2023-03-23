export const getTimeInSeconds = () => Math.floor(Date.now() / 1000);

export const getTotalTimeSpent = (
  current: number | undefined,
  start: number | undefined,
  end: number | undefined,
) => {
  if (typeof start === "undefined" || typeof end === "undefined") return 0;
  return (
    (typeof current === "undefined" ? 0 : current) +
    Math.floor(end - start) * 1000
  );
};
