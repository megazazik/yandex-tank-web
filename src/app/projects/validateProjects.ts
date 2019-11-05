import projectValidation from "../project/validate";
import { IProject } from "../project";

const validation = projectValidation.fullObjectRules({
  notUniqueName: () => false
});

export default (project: IProject, projects: IProject[]) => {
  return (
    validation.validate(project) || isUniqueNameValidate(project, projects)
  );
};

function isUniqueNameValidate(
  project: IProject,
  projects: IProject[]
): ReturnType<typeof validation.validate> {
  return projects.some(p => p.name === project.name)
    ? [{ type: "notUniqueName" }]
    : null;
}
