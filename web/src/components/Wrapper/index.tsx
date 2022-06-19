import React from "react";
import { motion } from "framer-motion";
import Footer from "../Footer";

interface WrapperProps {
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="p-2 h-screen dark:text-white">
      <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <main>{children}</main>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Wrapper;

