import { ICategory } from ".";
import { init } from "@megazazik/validate";
import { required } from "../../utils/validate/rules";

export default init<ICategory>().rules({
  name: {
    required
  }
});
