import { ITest } from "../test";
import tests, { ITestsState } from "./state";
import uuid from "uuid/v4";
import thunk from "../../utils/thunk";
import { IStorage } from "../storage/interface";

export interface IState extends ITestsState {
  isProcesssing: boolean;
  failOnRun: boolean;
}

export default tests
  .initState<IState>(state => ({
    ...state,
    isProcesssing: false,
    failOnRun: false
  }))
  .handlers({
    setProcessing: "isProcesssing",
    setItems: "items",
    setFailOnRun: "failOnRun"
  })
  .actionCreators({
    runTest: thunk(
      (
        storage: IStorage,
        runTest: (test: ITest) => Promise<boolean>,
        test: Omit<ITest, "id">
      ) => async dispatch => {
        try {
          dispatch.setProcessing(true);
          const fail = await runTest({ ...test, id: uuid() });
          if (fail) {
            dispatch.setFailOnRun(true);
          } else {
            const tests = await storage.getTests();
            dispatch.setItems(tests.items);
          }
        } finally {
          dispatch.setProcessing(false);
        }
      }
    ),
    load: thunk((storage: IStorage) => async dispatch => {
      try {
        dispatch.setProcessing(true);
        const tests = await storage.getTests();
        dispatch.setItems(tests.items);
      } finally {
        dispatch.setProcessing(false);
      }
    })
  });
