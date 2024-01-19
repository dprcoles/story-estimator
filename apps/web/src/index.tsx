import { AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <AnimatePresence mode="wait">
    <App />
  </AnimatePresence>,
);
