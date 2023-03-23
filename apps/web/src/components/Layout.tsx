import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ROUTE_HOME } from "@/utils/constants";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
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
