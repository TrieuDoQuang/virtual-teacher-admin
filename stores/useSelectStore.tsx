import { create } from "zustand";

interface SelectStore<T = any> {
    selectedItems: T[];
    setSelectedItems: (items: T[]) => void;
    clearSelectedItems: () => void;
}

export const useSelectStore = create<SelectStore>((set) => ({
    selectedItems: [],
    setSelectedItems: (items) => set({ selectedItems: items }),
    clearSelectedItems: () => set({ selectedItems: [] }),
}));



