import { build } from "encaps";
import categories from "../categories";
import projects from "../projects";
import tests from "../tests";

export default build().children({
  categories,
  projects,
  tests
});
