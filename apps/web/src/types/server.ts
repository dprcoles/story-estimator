import { Player } from "./player";
import { Room } from "./room";
import { RoomToasterEventType, ToasterEventDataMap } from "./toaster";

export interface UpdateResponse {
  players: Player[];
  room: Room;
  event?: {
    type: RoomToasterEventType;
    data: ToasterEventDataMap[RoomToasterEventType];
  };
}

export enum EmitEvent {
  ConnectionError = "connectionError",
  UpdatePlayer = "player:update",
  UpdatePlayerSuccess = "player:update.success",
  Settings = "room:settings",
  Join = "room:join",
  Disconnect = "room:disconnect",
  Vote = "room:vote",
  Show = "room:show",
  Reset = "room:reset",
  Update = "room:update",
  CompleteSession = "room:complete",
  ImportStories = "room:story.create",
  EditStory = "room:story.edit",
  EditStories = "room:story.edit-multiple",
  DeleteStory = "room:story.delete",
  SetActiveStory = "room:story.set-active",
  Complete = "room:story.complete",
  Ping = "room:ping",
  Pong = "room:pong",
  JoinTeam = "team:join",
  TeamUpdate = "team:update",
  JoinOrganisation = "organisation:join",
}
