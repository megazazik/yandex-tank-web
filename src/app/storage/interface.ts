import { ICategoriesState } from "../categories/state";
import { ICategory } from "../category";
import { IProjectsState } from "../projects/items";
import { IProject } from "../project";
import { ITestsState } from "../tests/state";
import { ITest } from "../test";

export interface IStorage {
  getCategories(): Promise<ICategoriesState>;
  setCategory(category: ICategory): Promise<void>;
  deleteCategory(id: string): Promise<void>;
  getProjects(): Promise<IProjectsState>;
  setProject(project: IProject): Promise<void>;
  deleteProject(id: string): Promise<void>;
  getTests(): Promise<ITestsState>;
  setTest(test: ITest): Promise<void>;
  deleteTest(id: string): Promise<void>;
}
