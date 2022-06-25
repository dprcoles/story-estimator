import { CountdownStatus } from "@/types/countdown";
import { InfoCardTab } from "@/types/info";
import { Player, PlayerType } from "@/types/player";
import { ShowType } from "@/types/show";
import { Story } from "@/types/story";
import React, { useState } from "react";
import Button from "../Button";
import Countdown from "../Countdown";
import History from "../History";
import Results from "../Results";

interface InfoCardProps {
  vote: string;
  showVotes: boolean;
  handleShow: (type: ShowType) => void;
  countdown: number;
  countdownStatus: CountdownStatus;
  players: Array<Player>;
  stories: Array<Story>;
  options: Array<string>;
  type: PlayerType;
  setFinalVote: (finalVote: string) => void;
  resetVotes: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  vote,
  showVotes,
  handleShow,
  countdown,
  countdownStatus,
  players,
  stories,
  options,
  type,
  setFinalVote,
  resetVotes,
}) => {
  const [tab, setTab] = useState<InfoCardTab>(InfoCardTab.CurrentStory);

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

  const playersToVote = players.filter(x => !x.vote).length;

  return (
    <div className="my-4 bg-light-secondary dark:bg-dark-secondary shadow-md mx-auto p-4   rounded-md">
      <div className="space-x-2">
        {tabs.map(x => (
          <button
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
                      Waiting on <b>{playersToVote}</b> player
                      {playersToVote === 1 ? "" : "s"} to vote...
                    </span>
                    <div className="flex space-x-4 mx-auto">
                      <Button onClick={() => handleShow(ShowType.Hurry)}>
                        Hurry other players
                      </Button>
                      <Button onClick={() => handleShow(ShowType.Force)}>
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
              <Countdown seconds={countdown} />
            )}
            {showVotes && (
              <Results
                players={players}
                options={options}
                setFinalVote={setFinalVote}
                resetVotes={resetVotes}
              />
            )}
          </>
        )}
        {tab === InfoCardTab.History && <History stories={stories} />}
      </div>
    </div>
  );
};

export default InfoCard;

