import React, { useState } from "react";
import definitionOfReadyExamples from "../examples/definitionOfReady.json";

const DefinitionOfReady: React.FC = () => {
  const [dorTab, setDorTab] = useState<string>("stories");
  return (
    <div className="grid gap-y-4">
      <div className="text-light-text dark:text-dark-text grid gap-y-2 text-sm">
        <p>
          A definition of ready (DoR) is used to determine whether work on a
          task is ready to be started. Before teams assign a task in a sprint,
          it must be sufficiently well described and understood by all team
          members.
        </p>
        <p>
          The development team should grasp enough of a proposed scope to plan
          it into a sprint, estimate completion time, and allocate adequate
          resources to meet its goal.
        </p>
        <p>
          A definition of ready serves as a checklist of criteria to help
          facilitate a team's decision to begin working on a new task.
        </p>
      </div>
      <div>
        {definitionOfReadyExamples.map(x => (
          <button
            key={x.id}
            className={`rounded-md p-3 text-sm ${
              x.id === dorTab
                ? "bg-light-hover dark:bg-dark-hover"
                : "bg-transparent"
            }`}
            onClick={() => setDorTab(x.id)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        <ul className="list-inside list-disc">
          {definitionOfReadyExamples
            .find(x => x.id === dorTab)
            ?.bullets.map(y => (
              <li className="list-item leading-7" key={y}>
                {y}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DefinitionOfReady;

