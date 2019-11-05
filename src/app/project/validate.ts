import { IProject } from ".";
import { init } from "@megazazik/validate";
import { required } from "../../utils/validate/rules";

export default init<IProject>().rules({
  name: {
    required
  }
});
