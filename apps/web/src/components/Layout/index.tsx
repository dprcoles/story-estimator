import { motion } from "framer-motion";
import React, { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import { ROUTE_HOME } from "@/utils/constants";

import Navbar from "../Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const isLandingPage = location.pathname === ROUTE_HOME;

  return (
    <div className="h-screen text-black dark:text-white">
      <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <main className="min-h-[90vh]">
          <div className="p-4 lg:mx-auto">
            {!isLandingPage && <Navbar />}
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default Layout;
