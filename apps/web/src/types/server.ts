import { Player } from "./player";
import { Room } from "./room";

export type UpdateResponse = {
  players: Player[];
  room: Room;
};

export enum EmitEvent {
  ConnectionError = "connectionError",
  UpdatePlayer = "player:update",
  Settings = "room:settings",
  Vote = "room:vote",
  Show = "room:show",
  Reset = "room:reset",
  Complete = "story:complete",
  AddStory = "story:add",
  EditStory = "story:edit",
  DeleteStory = "story:delete",
  SetActiveStory = "story:set-active",
  Update = "room:update",
  Ping = "ping",
  Pong = "pong",
  CompleteSession = "room:complete",
  ImportStories = "story:import",
}
