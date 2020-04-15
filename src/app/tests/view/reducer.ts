import { build } from "encaps";

export interface IState {
  phantomConfig: string;
  selectedTest?: string;
}

export const { reducer, actions } = build()
  .initState<IState>(() => ({
    phantomConfig: "",
    selectedTest: null
  }))
  .handlers({
    setConfig: "phantomConfig",
    selectTest: "selectedTest"
  });
