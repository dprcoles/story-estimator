import { Story } from "@/types/story";

export const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL;
export const SOCKET_HUB_NAME = import.meta.env.VITE_SOCKET_HUB_NAME || "story_estimator_hub";
export const ROUTE_HOME = "/";
export const ROUTE_ROOM = "/room";
export const ROUTE_TEAM = "/team";
export const ROUTE_SUMMARY = "/summary";
export const ROUTE_ORGANISATION = "/organisation";

export const DEFAULT_TEAM_ID = parseInt(import.meta.env.VITE_DEFAULT_TEAM_ID, 10);
export const DEFAULT_ORGANISATION_ID = parseInt(import.meta.env.VITE_DEFAULT_ORGANISATION_ID, 10);
export const REQUIRED_ROUTES = [ROUTE_ROOM, ROUTE_TEAM, ROUTE_ORGANISATION];

export const SKIP_VOTE_OPTION = "?";

export const NON_NUMERIC_OPTIONS = ["?", "☕️"];
export const OPTIONS: Array<string> = [
  "0.5",
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

export const COUNTDOWN_DESCRIPTION = "Enables a 3 second countdown before revealing the votes.";

export const FAST_MODE_DESCRIPTION =
  "Will force users to vote within a 10 second window after the first vote has been submitted.";

export const ADMIN_DESCRIPTION = "Select who you would like to be the admin of this session.";

export const DEFAULT_STORY: Story = {
  id: 0,
  description: "",
  active: false,
  endSeconds: undefined,
  roomId: 0,
  startSeconds: undefined,
  estimate: undefined,
  totalTimeSpent: 0,
};

export const ADMIN_ICON = "👑";
