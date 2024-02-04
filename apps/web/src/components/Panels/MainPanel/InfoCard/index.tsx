import React from "react";

import { Button } from "@/components/Core";
import { usePlayerStore } from "@/stores/playerStore";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { CountdownStatus } from "@/types/countdown";
import { Player, PlayerType } from "@/types/player";
import { EmitEvent } from "@/types/server";
import { ShowType } from "@/types/show";
import { SKIP_VOTE_OPTION, TEA_BREAK_OPTION } from "@/utils/constants";

import Countdown from "../Countdown";
import Results from "../Results";
import TipsCard from "./TipsCard";

interface InfoCardProps {
  vote: string;
  showVotes: boolean;
  players: Array<Player>;
  options: Array<string>;
}

const InfoCard = ({ vote, showVotes, players, options }: InfoCardProps) => {
  const { stories, countdown } = useRoomStore((state) => ({
    stories: state.room.stories,
    countdown: state.countdown,
  }));
  const defaultType = usePlayerStore((state) => state.player.defaultType);
  const { emit } = useSocketStore();

  const currentStory = stories.find((s) => s.active);

  const playersVoted = players.filter((x) => x.vote && x.defaultType === PlayerType.Voter);
  const playersVotedNumber = playersVoted.length;
  const voters = players.filter((x) => x.defaultType === PlayerType.Voter).length;

  return (
    <div className="mx-auto">
      <div className="flex">
        {(vote || defaultType === PlayerType.Spectator) &&
        countdown.status === CountdownStatus.STOPPED &&
        !showVotes ? (
          <div className="ml-auto flex space-x-4">
            <Button onClick={() => emit(EmitEvent.Show, { type: ShowType.Hurry })}>
              Hurry other voters
            </Button>
            <Button onClick={() => emit(EmitEvent.Show, { type: ShowType.Force })}>
              Force show votes
            </Button>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="p-2 md:mb-6 md:mt-2">
        {!showVotes ? (
          <>
            <div className="w-full">
              <div className="text-black dark:text-white">
                {countdown.status === CountdownStatus.STOPPED
                  ? "Story Title:"
                  : "Revealing votes in:"}
              </div>
              <div className="grid grid-cols-1 items-baseline space-y-4 md:grid-cols-2">
                {countdown.status === CountdownStatus.STOPPED ? (
                  <div className="text-4xl font-bold">{currentStory?.description}</div>
                ) : (
                  <Countdown seconds={countdown.timer} />
                )}
                <div className="text-4xl font-bold md:ml-auto">
                  {playersVotedNumber} / {voters} Voted
                </div>
              </div>
              {countdown.status === CountdownStatus.STOPPED && (
                <TipsCard>
                  <div className="p-4 text-sm">
                    <p className="pb-2">
                      Estimation for this story has now started. Use this time to discuss the
                      details of the story with your team, ask any questions you may have, and
                      ensure that it meets your Definition of Ready (DoR).
                    </p>
                    <p className="pb-2">
                      Once you are ready to estimate, select from the options below an estimate that
                      you think best represents the effort required to complete this story. If you
                      are unsure on what to estimate, you can select <b>{SKIP_VOTE_OPTION}</b> to
                      not affect the final estimate.
                    </p>
                    <p>
                      You can also select <b>{TEA_BREAK_OPTION}</b> if you would like to propose
                      your team takes a quick tea break!
                    </p>
                  </div>
                </TipsCard>
              )}
            </div>
          </>
        ) : (
          <>
            <TipsCard>
              <div className="p-4 text-sm">
                <p className="pb-2">
                  All votes have now been confirmed for this story. Use this time to discuss the
                  estimates that each player has submitted, and agree upon a final estimate as a
                  collective.
                </p>
                <p>
                  You may want to <b>Reset Votes</b> if you need to re-estimate, select{" "}
                  <b>Skip Story</b> if you want to skip or come back to this story, or select{" "}
                  <b>{TEA_BREAK_OPTION}</b> if your team needs a quick tea break!
                </p>
              </div>
            </TipsCard>
            <Results
              players={players}
              options={options}
              currentStoryId={stories.find((s) => s.active)?.id as number}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
