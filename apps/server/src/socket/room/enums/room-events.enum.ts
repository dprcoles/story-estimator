export enum RoomServerEvent {
  Update = "room:update",
  Reset = "room:reset",
  Show = "room:show",
}

export enum RoomClientEvent {
  Connected = "room:connected",
  Error = "room:error",
}

export enum RoomNotificationEvent {
  PlayerJoin = "player:join",
  PlayerLeave = "player:leave",
  VoteReset = "vote:reset",
  VoteShow = "vote:show",
  Settings = "settings",
  PlayerVote = "player:vote",
  StoryCreate = "story:create",
  StoryDelete = "story:delete",
  StoryComplete = "story:complete",
  StoryActive = "story:active",
  StorySkipped = "story:skipped",
}
