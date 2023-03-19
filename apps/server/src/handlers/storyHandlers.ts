import { PlayerType } from "src/player/enums/player-type.enum";
import { Story } from "../types/story";
import { handleResetRoom, handleUpdateRoom } from "./globalHandlers";
import { BaseHandlerParams } from ".";

const generateStoryId = (roomId: number) => {
  return Math.floor(Math.random() * 1000000) + roomId;
};

const getTotalTimeSpent = (
  current: number | undefined,
  start: number | undefined,
  end: number | undefined,
) => {
  if (typeof start === "undefined" || typeof end === "undefined") return 0;
  return (
    (typeof current === "undefined" ? 0 : current) +
    Math.floor(end - start) * 1000
  );
};

const getTimeInSeconds = () => Math.floor(Date.now() / 1000);

const registerStoryHandlers = ({
  io,
  socket,
  roomId,
  playerId,
  rooms,
  roomPlayers,
}: BaseHandlerParams) => {
  const updateActiveStory = (roomId: number, nextActiveId: number | null) => {
    const roomIndex = rooms.findIndex((r) => r.id === roomId);
    const activeStoryIndex = rooms[roomIndex].stories.findIndex(
      (s) => s.active,
    );

    if (activeStoryIndex !== -1) {
      rooms[roomIndex].stories[activeStoryIndex].active = false;
      rooms[roomIndex].stories[activeStoryIndex].endSeconds =
        getTimeInSeconds();
      rooms[roomIndex].stories[activeStoryIndex].totalTimeSpent =
        getTotalTimeSpent(
          rooms[roomIndex].stories[activeStoryIndex].totalTimeSpent,
          rooms[roomIndex].stories[activeStoryIndex].startSeconds,
          getTimeInSeconds(),
        );
    }

    if (nextActiveId) {
      const nextStoryIndex = rooms[roomIndex].stories.findIndex(
        (s) => s.id === nextActiveId,
      );

      rooms[roomIndex].stories[nextStoryIndex].active = true;
      rooms[roomIndex].stories[nextStoryIndex].startSeconds =
        getTimeInSeconds();
      rooms[roomIndex].stories[nextStoryIndex].endSeconds = undefined;
    }

    handleResetRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
  };

  const handleComplete = ({
    finalVote,
    storyId,
  }: {
    finalVote: string;
    storyId: number;
  }) => {
    if (roomId) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);
      const storyIndex = rooms[roomIndex].stories.findIndex(
        (s) => s.id === storyId,
      );

      const voters = roomPlayers.filter((p) => p.type === PlayerType.Voter);
      const spectators = roomPlayers.filter(
        (p) => p.type === PlayerType.Spectator,
      );

      rooms[roomIndex].stories[storyIndex].voterIds = voters?.map((v) => v.id);
      rooms[roomIndex].stories[storyIndex].spectatorIds = spectators?.map(
        (s) => s.id,
      );
      rooms[roomIndex].stories[storyIndex].votes = voters?.map((v) => ({
        playerId: v.id,
        vote: v.vote,
      }));
      rooms[roomIndex].stories[storyIndex].estimate = finalVote;

      updateActiveStory(roomId, null);

      if (!rooms[roomIndex].stories.find((s) => !s.estimate)) return;

      if (
        rooms[roomIndex].stories.length > storyIndex + 1 &&
        !rooms[roomIndex].stories[storyIndex + 1].estimate
      ) {
        updateActiveStory(roomId, rooms[roomIndex].stories[storyIndex + 1].id);
        return;
      }

      const nextIndex = rooms[roomIndex].stories.findIndex((s) => !s.estimate);
      updateActiveStory(roomId, rooms[roomIndex].stories[nextIndex].id);
    }
  };

  const handleAdd = (story: Story) => {
    if (roomId) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);
      const storyId = generateStoryId(roomId);

      rooms[roomIndex].stories.push({
        id: storyId,
        description: story.description,
        roomId: roomId,
        active: false,
        estimate: undefined,
        startSeconds: undefined,
        endSeconds: undefined,
        totalTimeSpent: undefined,
        spectatorIds: [],
        voterIds: [],
        votes: [],
      });
    }
    handleUpdateRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
  };

  const handleEdit = (story: Story) => {
    if (roomId) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);
      const storyIndex = rooms[roomIndex].stories.findIndex(
        (s) => s.id === story.id,
      );
      rooms[roomIndex].stories[storyIndex].description = story.description;
    }
    handleUpdateRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
  };

  const handleDelete = (id: number) => {
    if (roomId) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);
      const roomStories = rooms[roomIndex].stories;

      rooms[roomIndex].stories = roomStories.filter((rs) => rs.id !== id);
    }
    handleUpdateRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
  };

  const handleImport = (stories: string[]) => {
    if (roomId) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);

      stories.forEach((story: string) => {
        const storyId = generateStoryId(roomId);

        rooms[roomIndex].stories.push({
          id: storyId,
          description: story,
          roomId: roomId,
          active: false,
          estimate: undefined,
          startSeconds: undefined,
          endSeconds: undefined,
          totalTimeSpent: undefined,
          spectatorIds: [],
          voterIds: [],
          votes: [],
        });
      });

      handleUpdateRoom({ io, socket, roomId, playerId, rooms, roomPlayers });
    }
  };

  const handleSetActive = (id: number | null) => {
    if (roomId) {
      updateActiveStory(roomId, id);
    }
  };

  socket.on("story:complete", handleComplete);
  socket.on("story:add", handleAdd);
  socket.on("story:edit", handleEdit);
  socket.on("story:delete", handleDelete);
  socket.on("story:import", handleImport);
  socket.on("story:set-active", handleSetActive);
};

export default registerStoryHandlers;
