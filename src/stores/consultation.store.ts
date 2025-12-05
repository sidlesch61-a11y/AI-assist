import { create } from "zustand";
import type { Consultation } from "../types/consultation.types";

interface ConsultationState {
  consultations: Consultation[];
  setConsultations: (items: Consultation[]) => void;
  addConsultation: (item: Consultation) => void;
}

export const useConsultationStore = create<ConsultationState>((set) => ({
  consultations: [],
  setConsultations: (items) => set({ consultations: items }),
  addConsultation: (item) =>
    set((state) => ({ consultations: [item, ...state.consultations] })),
}));


