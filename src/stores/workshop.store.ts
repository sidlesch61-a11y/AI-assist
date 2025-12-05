import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Workshop } from "../types/workshop.types";

interface WorkshopState {
  currentWorkshop: Workshop | null;
  workshops: Workshop[];
  setCurrentWorkshop: (workshop: Workshop | null) => void;
  setWorkshops: (workshops: Workshop[]) => void;
}

const STORAGE_KEY = "workshop-storage";

export const useWorkshopStore = create<WorkshopState>()(
  persist(
    (set) => ({
      currentWorkshop: null,
      workshops: [],
      setCurrentWorkshop: (workshop) => set({ currentWorkshop: workshop }),
      setWorkshops: (workshops) => set({ workshops }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        currentWorkshop: state.currentWorkshop,
        workshops: state.workshops,
      }),
    },
  ),
);

