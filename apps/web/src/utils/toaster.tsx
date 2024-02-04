import React from "react";

import { Player } from "@/types/player";
import { Room } from "@/types/room";
import { RoomToasterEvent, RoomToasterEventType, ToasterEventDataMap } from "@/types/toaster";

interface ToasterData {
  title: string;
  description: React.ReactNode;
}

export function getToasterData<T extends RoomToasterEventType>(
  event: T,
  data: ToasterEventDataMap[T],
  state: { room: Room; players: Player[] },
): ToasterData | null {
  switch (event) {
    case RoomToasterEvent.PlayerJoin:
      const joinData = data as ToasterEventDataMap[RoomToasterEvent["PlayerJoin"]];
      const joiner = state.players.find((p) => p.id === joinData.id);
      return {
        title: "Player joined 👋🏻",
        description: (
          <>
            <b>
              {joiner?.emoji} {joiner?.name}
            </b>{" "}
            has joined the room
          </>
        ),
      };
    case RoomToasterEvent.PlayerLeave:
      const leaveData = data as ToasterEventDataMap[RoomToasterEvent["PlayerLeave"]];
      const leaver = state.players.find((p) => p.id === leaveData.id);
      return {
        title: "Player left 🚪",
        description: (
          <>
            <b>
              {leaver?.emoji} {leaver?.name}
            </b>{" "}
            has left the room
          </>
        ),
      };
    case RoomToasterEvent.VoteReset:
      return {
        title: "Votes reset 🔄",
        description: "Submit your revised vote for the current story",
      };
    case RoomToasterEvent.VoteShow:
      return {
        title: "Votes revealing 🎭",
        description: "The votes for the current story are being revealed",
      };
    case RoomToasterEvent.Settings:
      return {
        title: "Settings updated ⚙️",
        description: "The room settings have been updated",
      };
    case RoomToasterEvent.PlayerVote:
      const voteData = data as ToasterEventDataMap[RoomToasterEvent["PlayerVote"]];
      const voter = state.players.find((p) => p.id === voteData.id);
      return {
        title: "Player voted 🗳",
        description: (
          <>
            <b>
              {voter?.emoji} {voter?.name}
            </b>{" "}
            has voted
          </>
        ),
      };
    case RoomToasterEvent.StoryCreate:
      const stories = (data as ToasterEventDataMap[RoomToasterEvent["StoryCreate"]]).stories;
      return {
        title: "Story added 📝",
        description:
          stories.length === 1 ? (
            <>
              Story <b>{stories[0]}</b> has been added
            </>
          ) : (
            <>
              <b>{stories.length}</b> Stories have been added
            </>
          ),
      };
    case RoomToasterEvent.StoryDelete:
      const deletedStoryData = data as ToasterEventDataMap[RoomToasterEvent["StoryDelete"]];
      return {
        title: "Story deleted 🗑",
        description: (
          <>
            Story <b>{deletedStoryData.description}</b> has been deleted
          </>
        ),
      };
    case RoomToasterEvent.StoryComplete:
      const completedStoryData = data as ToasterEventDataMap[RoomToasterEvent["StoryComplete"]];
      const completedStory = state.room.stories.find((s) => s.id === completedStoryData.id);
      return {
        title: "Story completed 🏁",
        description: (
          <>
            Story <b>{completedStory?.description}</b> has been completed with an estimate of{" "}
            <b>{completedStoryData.vote}</b>
          </>
        ),
      };
    case RoomToasterEvent.StorySkipped:
      const skippedStoryData = data as ToasterEventDataMap[RoomToasterEvent["StorySkipped"]];
      const skippedStory = state.room.stories.find((s) => s.id === skippedStoryData.id);
      return {
        title: "Story skipped 🏃🏻‍♂️",
        description: (
          <>
            Story <b>{skippedStory?.description}</b> has been skipped
          </>
        ),
      };
    case RoomToasterEvent.StoryActive:
      const activeStoryData = data as ToasterEventDataMap[RoomToasterEvent["StoryActive"]];
      const activeStory = state.room.stories.find((s) => s.id === activeStoryData.id);
      return {
        title: "Story estimation started 🚀",
        description: (
          <>
            Estimation for <b>{activeStory?.description}</b> has now started
          </>
        ),
      };
  }

  return null;
}
