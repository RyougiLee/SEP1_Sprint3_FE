import {create} from "zustand"

interface TitleState{
  title: string;
  setTitle: (title: any) => void;
}

export const useTitleStore = create<TitleState>((set:any) => ({
  title: "Title",
  setTitle: (title: string) => set({title}),
}));