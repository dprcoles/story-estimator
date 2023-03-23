import { Story } from "src/story/interfaces/story.interface";

export interface Room {
  id: number;
  name: string;
  settings: Settings;
  stories: Story[];
  active: boolean;
  teamId: number | null;
  integrations: RoomIntegrations | null;
}

export type Settings = {
  countdown: boolean;
  fastMode: boolean;
  admin: number;
};

export type RoomIntegrations = {
  jira?: number | null;
};
