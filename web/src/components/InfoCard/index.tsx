import React, { useState } from "react";
import { useSocketStore } from "@/stores/socketStore";
import { CountdownStatus } from "@/types/countdown";
import { InfoCardTab } from "@/types/info";
import { Player, PlayerType } from "@/types/player";
import { ShowType } from "@/types/show";
import { Story } from "@/types/story";
import Button from "../Button";
import Countdown from "../Countdown";
import History from "../History";
import Results from "../Results";
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
  const [tab, setTab] = useState<InfoCardTab>(InfoCardTab.CurrentStory);

  const { emit } = useSocketStore();

  const tabs = [
    {
      id: InfoCardTab.CurrentStory,
      label: "Current Story",
    },
    {
      id: InfoCardTab.History,
      label: "History",
    },
  ];

  const playersToVote = players.filter(
    x => !x.vote && x.type === PlayerType.Voter
  );
  const playersToVoteNumber = playersToVote.length;

  return (
    <div className="my-4 bg-light-secondary dark:bg-dark-secondary shadow-md mx-auto p-4   rounded-md">
      <div className="space-x-2">
        {tabs.map(x => (
          <button
            key={x.id}
            className={`rounded-full p-2 my-2 w-36 ${
              x.id === tab
                ? "bg-light-main dark:bg-dark-main text-white dark:text-black"
                : "bg-light-primary dark:bg-dark-primary"
            }`}
            onClick={() => setTab(x.id)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tab === InfoCardTab.CurrentStory && (
          <>
            {!showVotes && countdownStatus === CountdownStatus.STOPPED && (
              <div className="text-center">
                {vote || type === PlayerType.Spectator ? (
                  <div className="grid md:grid-cols-2 items-center justify-between space-y-2 md:space-y-0">
                    <span className="text-center">
                      Waiting on <b>{playersToVoteNumber}</b> player
                      {playersToVoteNumber === 1 ? "" : "s"} to vote...
                    </span>
                    <div className="flex space-x-4 mx-auto">
                      <Button
                        onClick={() => emit(EmitEvent.Show, ShowType.Hurry)}
                      >
                        Hurry other players
                      </Button>
                      <Button
                        onClick={() => emit(EmitEvent.Show, ShowType.Force)}
                      >
                        Force show votes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>Select from one of the options below to cast your vote!</>
                )}
              </div>
            )}
            {!showVotes && countdownStatus === CountdownStatus.STARTED && (
              <Countdown seconds={countdown} playersToVote={playersToVote} />
            )}
            {showVotes && <Results players={players} options={options} />}
          </>
        )}
        {tab === InfoCardTab.History && <History stories={stories} />}
      </div>
    </div>
  );
};

export default InfoCard;

