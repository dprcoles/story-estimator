import { Story } from "./story";

export type Room = {
  id: string;
  name: string;
  settings: Settings;
  stories: Story[];
  active: boolean;
  teamId: string | null;
  integrations: RoomIntegrations | null;
};

export type Settings = {
  countdown: boolean;
  fastMode: boolean;
};

export interface RoomIntegrations {
  jira?: string | null;
}

