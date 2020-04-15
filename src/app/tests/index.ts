import { ITest } from "../test";
import tests, { ITestsState } from "./state";
import thunk from "../../utils/thunk";
import { ITestsService } from "./service";

export interface IState extends ITestsState {
  isProcesssing: boolean;
  failOnRun: boolean;
  runningTest?: string;
}

export default tests
  .initState<IState>(state => ({
    ...state,
    isProcesssing: false,
    failOnRun: false,
    runningTest: null
  }))
  .handlers({
    setProcessing: "isProcesssing",
    setItems: "items",
    setFailOnRun: "failOnRun",
    setRunningTest: "runningTest"
  })
  .actionCreators({
    runTest: thunk(
      (
        service: ITestsService,
        test: Pick<ITest, "phantomConfig" | "projectId">
      ) => async dispatch => {
        try {
          dispatch.setProcessing(true);
          const success = await service.runTest(test);
          dispatch.setFailOnRun(success);
          const tests = await service.getTests();
          dispatch.setItems(tests.items);
        } catch {
          dispatch.setFailOnRun(true);
        } finally {
          dispatch.setProcessing(false);
        }
      }
    ),
    load: thunk((service: ITestsService) => async dispatch => {
      try {
        dispatch.setProcessing(true);
        const tests = await service.getTests();
        dispatch.setItems(tests.items);
      } finally {
        dispatch.setProcessing(false);
      }
    })
  });
