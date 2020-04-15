import { IProjectsState } from "./items";
import { IProject } from "../project";

export interface IProjectsService {
  getProjects(): Promise<IProjectsState>;
  setProject(project: IProject): Promise<void>;
  deleteProject(id: string): Promise<void>;
}
