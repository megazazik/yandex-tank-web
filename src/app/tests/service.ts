import { ITestsState } from "./state";
import { ITest } from "../test";

export interface ITestsService {
  getTests(): Promise<ITestsState>;
  runTest: (
    test: Pick<ITest, "phantomConfig" | "projectId">
  ) => Promise<boolean>;
}
