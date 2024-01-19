import { create } from "zustand";

type SessionStore = {
  isSessionModalOpen: boolean;
  setIsSessionModalOpen: (isSessionModalOpen: boolean) => void;
};

export const useSessionStore = create<SessionStore>(
  (set): SessionStore => ({
    isSessionModalOpen: false,
    setIsSessionModalOpen: (isSessionModalOpen: boolean) =>
      set((state) => ({ ...state, isSessionModalOpen })),
  }),
);
