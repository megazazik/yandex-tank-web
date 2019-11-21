import { ITest } from ".";
import { init } from "@megazazik/validate";
import { required } from "../../utils/validate/rules";

export default init<ITest>().rules({
  phantomConfig: {
    required
  }
});
