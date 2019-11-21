import { build, IAction } from "encaps";

export interface ITest {
  date: number;
  id: string;
  projectId: string;
  phantomConfig: string;
  status: "in-progress" | "complete";
}

export default build()
  .initState<ITest>(() => ({
    status: "in-progress",
    date: null,
    id: null,
    projectId: null,
    phantomConfig: ""
  }))
  .handlers({
    setPhantom: (state, { payload }: IAction<string>) => ({
      ...state,
      phantomConfig: payload
    })
  });
