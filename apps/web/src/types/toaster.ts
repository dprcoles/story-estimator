export const RoomToasterEvent = {
  PlayerJoin: "player:join",
  PlayerLeave: "player:leave",
  VoteReset: "vote:reset",
  VoteShow: "vote:show",
  Settings: "settings",
  PlayerVote: "player:vote",
  StoryCreate: "story:create",
  StoryDelete: "story:delete",
  StoryComplete: "story:complete",
  StoryActive: "story:active",
  StorySkipped: "story:skipped",
} as const;

export type RoomToasterEvent = typeof RoomToasterEvent;
export type RoomToasterEventType = (typeof RoomToasterEvent)[keyof typeof RoomToasterEvent];

export interface ToasterEventDataMap {
  [RoomToasterEvent.PlayerJoin]: { id: number };
  [RoomToasterEvent.PlayerLeave]: { id: number };
  [RoomToasterEvent.VoteReset]: Record<string, never>;
  [RoomToasterEvent.VoteShow]: Record<string, never>;
  [RoomToasterEvent.Settings]: Record<string, never>;
  [RoomToasterEvent.PlayerVote]: { id: number; vote: string };
  [RoomToasterEvent.StoryCreate]: { stories: string[] };
  [RoomToasterEvent.StoryDelete]: { description: string };
  [RoomToasterEvent.StoryComplete]: { id: number; vote: string };
  [RoomToasterEvent.StoryActive]: { id: number };
  [RoomToasterEvent.StorySkipped]: { id: number; vote: string };
}
