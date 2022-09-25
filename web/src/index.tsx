import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AnimatePresence } from "framer-motion";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AnimatePresence exitBeforeEnter>
    <App />
  </AnimatePresence>
);

