import { Story } from "./story";

export type Room = {
  id: string;
  settings: RoomSettings;
  stories: Story[];
  active: boolean;
};

export type RoomSettings = {
  countdown: boolean;
  fastMode: boolean;
};

