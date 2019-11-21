import test from "../test";
import { createMap } from "encaps";

const testsModel = createMap(test);
type ITestsState = ReturnType<typeof testsModel.reducer>;

export { ITestsState };

export default testsModel;
