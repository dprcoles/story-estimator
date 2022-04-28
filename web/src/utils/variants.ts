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
      duration: 0.5,
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

