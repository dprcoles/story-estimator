import { Story } from "./story";

export type Room = {
  id: string;
  name: string;
  settings: Settings;
  stories: Story[];
  active: boolean;
};

export type Settings = {
  countdown: boolean;
  fastMode: boolean;
};

