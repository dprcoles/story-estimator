import React from "react";
import { motion } from "framer-motion";

interface WrapperProps {
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="h-screen text-black dark:text-white">
      <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <main className="min-h-screen">{children}</main>
      </motion.div>
    </div>
  );
};

export default Wrapper;

