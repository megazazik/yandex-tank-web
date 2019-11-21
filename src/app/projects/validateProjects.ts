import projectValidation from "../project/validate";
import { IProject } from "../project";
import { init } from "@megazazik/validate";

export interface ICreateProjectValidationState {
  project: IProject;
  projects: IProject[];
}

export default init<ICreateProjectValidationState>()
  .rules({ project: projectValidation })
  .fullObjectRules({
    notUniqueName: ({ projects, project }) =>
      projects.some(p => p.name === project.name && p.id !== project.id)
  });
