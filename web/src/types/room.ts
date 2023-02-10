import { Story } from "./story";

export type Room = {
  id: number;
  name: string;
  settings: RoomSettings;
  stories: Story[];
  active: boolean;
  teamId: number | null;
  integrations: RoomIntegrations | null;
};

export type RoomSettings = {
  countdown: boolean;
  fastMode: boolean;
  admin: number;
};

export interface RoomIntegrations {
  jira?: number | null;
}

