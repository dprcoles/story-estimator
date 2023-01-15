/**
 * Model Vote
 *
 */
export type Vote = {
  playerId: string;
  vote: string | null;
};

/**
 * Model JqlQuery
 *
 */
export type JqlQuery = {
  id: string;
  name: string;
  query: string;
};

/**
 * Model players
 *
 */
export type players = {
  id: string;
  defaultType: string;
  emoji: string;
  name: string;
};

/**
 * Model sessions
 *
 */
export type sessions = {
  id: string;
  name: string;
  playerIds: string[];
  storyIds: string[];
  teamId: string | null;
};

/**
 * Model stories
 *
 */
export type stories = {
  id: string;
  description: string;
  estimate: string | null;
  spectatorIds: string[];
  startSeconds: number | null;
  endSeconds: number | null;
  totalTimeSpent: number | null;
  voterIds: string[];
  votes: Vote[];
  sessionId: string;
};

/**
 * Model teams
 *
 */
export type teams = {
  id: string;
  name: string;
  jiraIntegrationId: string | null;
};

/**
 * Model jira_integrations
 *
 */
export type jira_integrations = {
  id: string;
  apiToken: string;
  configuredById: string;
  domain: string;
  jqlQueries: JqlQuery[];
};

