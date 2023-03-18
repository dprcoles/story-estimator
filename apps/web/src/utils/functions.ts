export const getTimeSpent = (total: number | undefined) => {
  if (typeof total === "undefined") return "-:-";
  return new Date(total).toISOString().substr(14, 5);
};
