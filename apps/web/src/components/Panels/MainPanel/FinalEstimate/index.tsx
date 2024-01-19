import { motion } from "framer-motion";
import React, { useState } from "react";

import { Button } from "@/components/Core";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { FADE_IN, STAGGER } from "@/utils/variants";

import Option from "../Option";

interface FinalEstimateProps {
  options: Array<string>;
  currentStoryId: number;
}

const FinalEstimate = ({ options, currentStoryId }: FinalEstimateProps) => {
  const [selected, setSelected] = useState<string>("");

  const { emit } = useSocketStore();

  return (
    <div>
      <motion.div variants={STAGGER}>
        <div className="m-2 text-light-text dark:text-dark-text">
          Select Agreed Estimate:
        </div>
        <div className="m-2 gap-1 grid justify-center lg:grid-cols-6 grid-cols-3">
          {options.map((option: string) => (
            <motion.div
              variants={FADE_IN}
              className="text-center"
              key={`${option}-component`}
            >
              <Option
                value={option}
                onClick={() => setSelected(option)}
                selected={selected === option}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="w-auto flex mt-8 align-middle items-center md:float-right space-x-2">
        <Button onClick={() => emit(EmitEvent.Reset)}>Reset Votes</Button>
        <Button
          onClick={() =>
            emit(EmitEvent.Complete, {
              vote: selected,
              id: currentStoryId,
            })
          }
          disabled={selected === ""}
          color="primary"
        >
          Complete Estimate
        </Button>
      </div>
    </div>
  );
};

export default FinalEstimate;
