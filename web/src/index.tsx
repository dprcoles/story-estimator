import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Wrapper from "./components/Wrapper";
import { AnimatePresence } from "framer-motion";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Wrapper>
    <AnimatePresence exitBeforeEnter>
      <App />
    </AnimatePresence>
  </Wrapper>
);

