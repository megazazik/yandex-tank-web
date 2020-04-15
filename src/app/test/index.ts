import { build, IAction } from "encaps";

export interface ITest {
  date: number;
  id: string;
  projectId: string;
  phantomConfig: string;
}

export default build()
  .initState<ITest>(() => ({
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
