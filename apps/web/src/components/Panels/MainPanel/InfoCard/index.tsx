import React from "react";
import { Button } from "ui";
import Countdown from "../Countdown";
import Results from "../Results";
import { useSocketStore } from "@/stores/socketStore";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { ShowType } from "@/types/show";
import { Story } from "@/types/story";
import { EmitEvent } from "@/types/server";

interface InfoCardProps {
  vote: string;
  showVotes: boolean;
  countdown: number;
  countdownStatus: CountdownStatus;
  players: Array<Player>;
  stories: Array<Story>;
  options: Array<string>;
  type: PlayerType;
}

const InfoCard: React.FC<InfoCardProps> = ({
  vote,
  showVotes,
  countdown,
  countdownStatus,
  players,
  stories,
  options,
  type,
}) => {
  const { emit } = useSocketStore();

  const currentStory = stories.find((s) => s.active);

  const playersToVote = players.filter(
    (x) => !x.vote && x.defaultType === PlayerType.Voter,
  );
  const playersVoted = players.filter(
    (x) => x.vote && x.defaultType === PlayerType.Voter,
  );
  const playersVotedNumber = playersVoted.length;
  const voters = players.filter(
    (x) => x.defaultType === PlayerType.Voter,
  ).length;

  return (
    <div className="mx-auto">
      <div className="flex">
        {(vote || type === PlayerType.Spectator) &&
        countdownStatus === CountdownStatus.STOPPED &&
        !showVotes ? (
          <div className="flex space-x-4 ml-auto">
            <Button
              onClick={() => emit(EmitEvent.Show, { type: ShowType.Hurry })}
            >
              Hurry other voters
            </Button>
            <Button
              onClick={() => emit(EmitEvent.Show, { type: ShowType.Force })}
            >
              Force show votes
            </Button>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="p-2 md:my-6">
        {!showVotes ? (
          <>
            <div className="w-full">
              <div className="text-light-text dark:text-dark-text">
                {countdownStatus === CountdownStatus.STOPPED
                  ? "Story Title:"
                  : "Revealing votes in:"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 items-baseline">
                {countdownStatus === CountdownStatus.STOPPED ? (
                  <div className="text-4xl font-bold">
                    {currentStory?.description}
                  </div>
                ) : (
                  <Countdown
                    seconds={countdown}
                    playersToVote={playersToVote}
                  />
                )}
                <div className="md:ml-auto text-4xl font-bold">
                  {playersVotedNumber} / {voters} Voted
                </div>
              </div>
            </div>
          </>
        ) : (
          <Results
            players={players}
            options={options}
            currentStoryId={stories.find((s) => s.active)?.id as number}
          />
        )}
      </div>
    </div>
  );
};

export default InfoCard;
