import { Player } from "./player";
import { Room } from "./room";
import { Story } from "./story";

export type UpdateResponse = {
  players: Player[];
  room: Room;
  stories: Story[];
};

