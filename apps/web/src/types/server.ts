import { Player } from "./player";
import { Room } from "./room";

export type UpdateResponse = {
  players: Player[];
  room: Room;
};

export enum EmitEvent {
  ConnectionError = "connectionError",
  UpdatePlayer = "player:update",
  UpdatePlayerSuccess = "player:update.success",
  Settings = "room:settings",
  Join = "room:join",
  Vote = "room:vote",
  Show = "room:show",
  Reset = "room:reset",
  Update = "room:update",
  CompleteSession = "room:complete",
  ImportStories = "room:story.create",
  EditStory = "room:story.edit",
  DeleteStory = "room:story.delete",
  SetActiveStory = "room:story.set-active",
  Complete = "room:story.complete",
  Ping = "ping",
  Pong = "pong",
}
