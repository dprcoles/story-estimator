import { Player } from "./player";
import { Room } from "./room";
import { Story } from "./story";

export type UpdateResponse = {
  players: Player[];
  room: Room;
  stories: Story[];
};

export enum EmitEvent {
  Name = "name",
  Type = "type",
  Emoji = "emoji",
  Settings = "settings",
  Description = "description",
  Vote = "vote",
  Show = "show",
  Reset = "reset",
  Complete = "complete",
  Update = "update",
  Ping = "ping",
  Pong = "pong",
}

