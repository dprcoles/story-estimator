import { Socket } from "socket.io-client";
import { create } from "zustand";

import { EmitEvent } from "@/types/server";

type SocketStore = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  emit: (event: EmitEvent, args?: any) => void;
};

export const useSocketStore = create<SocketStore>(
  (set, get): SocketStore => ({
    socket: null,
    setSocket: (socket: Socket) => set((state) => ({ ...state, socket, loading: false })),
    loading: true,
    setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
    emit: (event: EmitEvent, args?: any) => {
      get().socket?.emit(event, args);
    },
  }),
);
