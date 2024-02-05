import { NUMERIC_OPTIONS_NUMERIC } from "./constants";

export const getTimeSpent = (total: number | undefined) => {
  if (typeof total === "undefined" || isNaN(total)) return "-:-";
  return new Date(total).toISOString().substr(14, 5);
};

export const getClosestValidEstimate = (average: number) => {
  const validOptions = NUMERIC_OPTIONS_NUMERIC.filter((num) => num >= average);
  validOptions.sort((a, b) => a - b);
  return validOptions.length > 0 ? validOptions[0] : average;
};
