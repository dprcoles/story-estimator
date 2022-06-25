import { Player } from "./player";
import { Room } from "./room";

export type UpdateResponse = {
  players: Player[];
  room: Room;
};

