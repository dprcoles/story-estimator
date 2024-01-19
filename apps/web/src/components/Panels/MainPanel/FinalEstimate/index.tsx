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
        <div className="text-light-text dark:text-dark-text m-2">
          Select Agreed Estimate:
        </div>
        <div className="m-2 grid grid-cols-3 justify-center gap-1 lg:grid-cols-6">
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
      <div className="mt-8 flex w-auto items-center space-x-2 align-middle md:float-right">
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
