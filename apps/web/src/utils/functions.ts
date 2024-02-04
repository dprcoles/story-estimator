import { NUMERIC_OPTIONS_NUMERIC } from "./constants";

export const getTimeSpent = (total: number | undefined) => {
  if (typeof total === "undefined" || isNaN(total)) return "-:-";
  return new Date(total).toISOString().substr(14, 5);
};

export const getClosestValidEstimate = (average: number) => {
  const roundedAverage = Math.ceil(average);
  let closestEstimate = NUMERIC_OPTIONS_NUMERIC[0];
  let smallestDifference = Math.abs(roundedAverage - closestEstimate);

  for (const estimate of NUMERIC_OPTIONS_NUMERIC) {
    const difference = Math.abs(roundedAverage - estimate);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestEstimate = estimate;
    }
  }

  return closestEstimate;
};
