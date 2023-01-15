import { Player } from "./player";
import { Room } from "./room";

export type UpdateResponse = {
  players: Player[];
  room: Room;
};

export enum EmitEvent {
  ConnectionError = "connectionError",
  UpdatePlayer = "updatePlayer",
  Settings = "settings",
  Vote = "vote",
  Show = "show",
  Reset = "reset",
  Complete = "complete",
  AddStory = "addStory",
  EditStory = "editStory",
  SetActiveStory = "setActiveStory",
  Update = "update",
  Ping = "ping",
  Pong = "pong",
  CompleteSession = "completeSession",
  SessionComplete = "sessionComplete",
  ImportStories = "importStories",
}

