import { Variants } from "framer-motion";

export const EASE = [0.5, -0.05, 0.5, 0.99];

export const STAGGER: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const FADE_IN = {
  initial: {
    y: 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: EASE,
    },
  },
  exit: {
    y: 0,
    opacity: 0,
    transition: {
      duration: 1,
      ease: EASE,
    },
  },
};

export const FADE_UP: Variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

export const FADE_FROM_LEFT: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: EASE,
    },
  },
};

export const FADE_DOWN: Variants = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

export const EXPAND_IN: Variants = {
  initial: {
    opacity: 0,
    size: 0,
  },
  animate: {
    opacity: 1,
    size: 1,
    transition: {
      duration: 1,
      ease: EASE,
    },
  },
};

export const ICON_FADE = (colour: string): Variants => {
  return {
    initial: {
      pathLength: 0,
      fill: `rgba(${colour}, 0)`,
      opacity: 0,
    },
    animate: {
      pathLength: 1,
      fill: `rgba(${colour}, 1)`,
      transition: {
        default: { duration: 2, ease: EASE },
        fill: { delay: 0.5, duration: 2, ease: EASE },
      },
      opacity: 1,
    },
  };
};
