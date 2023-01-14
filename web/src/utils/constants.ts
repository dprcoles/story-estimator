import { Story } from "@/types/story";

export const API_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

export const ROUTE_ROOM: string = "/room";
export const ROUTE_SUMMARY: string = "/summary";
export const NON_NUMERIC_OPTIONS = ["∞", "?", "☕️"];
export const OPTIONS: Array<string> = [
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
  ...NON_NUMERIC_OPTIONS,
];

export const THEME_STORAGE_KEY = "theme";
export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";

export const COUNTDOWN_DESCRIPTION =
  "Enables a 3 second countdown before revealing the votes.";

export const FAST_MODE_DESCRIPTION =
  "Will force users to vote within a 10 second window after the first vote has been submitted.";

export const DEFAULT_STORY: Story = {
  id: "",
  description: "",
  active: false,
  endSeconds: undefined,
  roomId: "",
  startSeconds: undefined,
  estimate: undefined,
  totalTimeSpent: 0,
};

