"use client";

import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

const ModalContext = createContext({ openSchedule: () => {} });
export const useModal = () => useContext(ModalContext);

// Provides openSchedule() to the whole app. It now routes to the dedicated
// booking page (/start), the same way ebpearls' "Schedule Call" opens a full
// contact page rather than a small popup.
export function ModalProvider({ children }) {
  const router = useRouter();
  const openSchedule = () => router.push("/start");
  return (
    <ModalContext.Provider value={{ openSchedule }}>
      {children}
    </ModalContext.Provider>
  );
}
