import { motion } from "framer-motion";
import React from "react";

import { FADE_IN } from "@/utils/variants";

interface TipsCardProps {
  children: React.ReactNode;
}

const TipsCard = ({ children }: TipsCardProps) => {
  return (
    <motion.div
      variants={FADE_IN}
      className="mt-8 rounded-lg border border-black dark:border-white"
    >
      {children}
    </motion.div>
  );
};

export default TipsCard;
