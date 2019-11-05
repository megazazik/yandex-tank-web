import project from "../../project";
import { createMap } from "encaps";

const projectsModel = createMap(project);

type IProjectsState = ReturnType<typeof projectsModel.reducer>;

export { IProjectsState };

export default projectsModel;
