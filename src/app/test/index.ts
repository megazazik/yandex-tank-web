import { build, IAction } from "encaps";
import { IProject } from "../project";

export interface ITest {
  date: number;
  id: string;
  projectId: string;
}

export default build()
  .initState<ITest>(() => null)
  .handlers({
    init: (
      _,
      { payload: { project, id } }: IAction<{ project: IProject; id: string }>
    ) => ({
      date: Date.now(),
      projectId: project.id,
      id
    })
  });
