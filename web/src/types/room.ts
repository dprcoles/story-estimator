import { Story } from "./story";

export type Room = {
  id: string;
  name: string;
  settings: RoomSettings;
  stories: Story[];
  active: boolean;
  teamId: string | null;
  integrations: RoomIntegrations | null;
};

export type RoomSettings = {
  countdown: boolean;
  fastMode: boolean;
  admin: string;
};

export interface RoomIntegrations {
  jira?: string | null;
}

