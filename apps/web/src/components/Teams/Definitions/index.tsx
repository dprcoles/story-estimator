import React from "react";
import DefinitionOfReady from "./DefinitionOfReady";

const Definitions: React.FC = () => {
  const definitions = [
    {
      id: "dor",
      title: "Definition of Ready (DoR)",
      component: <DefinitionOfReady />,
    },
  ];

  return (
    <div>
      {definitions.map((x) => (
        <div
          key={x.id}
          className="pb-2 border-b border-b-light-hover dark:border-b-dark-hover"
        >
          <div className="font-bold text-2xl mb-4">{x.title}</div>
          {x.component}
        </div>
      ))}
    </div>
  );
};

export default Definitions;
