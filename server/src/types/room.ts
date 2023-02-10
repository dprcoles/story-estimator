import { Story } from "./story";

export type Room = {
  id: number;
  name: string;
  settings: Settings;
  stories: Story[];
  active: boolean;
  teamId: number | null;
  integrations: RoomIntegrations | null;
};

export type Settings = {
  countdown: boolean;
  fastMode: boolean;
};

export interface RoomIntegrations {
  jira?: number | null;
}

