import { IStorage } from "../interface";
import { ICategoriesState } from "../../categories/state";
import { ICategory } from "../../category";
import { IProjectsState } from "../../projects/items";
import { IProject } from "../../project";
import { ITestsState } from "../../tests/state";
import { ITest } from "../../test";
import { getItems, setItem, deleteItem } from "./utils";
import { join } from "path";

const CATEGORIES_PATH = "categories";
const PROJECTS_PATH = "projects";
const TESTS_PATH = "tests";

export default class FileStorage {
  constructor(private _path: string) {}

  getCategories(): Promise<ICategoriesState> {
    return getItems(join(this._path, CATEGORIES_PATH));
  }

  setCategory(category: ICategory): Promise<void> {
    return setItem(join(this._path, CATEGORIES_PATH), category.id, category);
  }

  async deleteCategory(id: string): Promise<void> {
    const projects = await this.getProjects();
    await Promise.all(
      Object.values(projects.items)
        .filter(project => project.categoryId === id)
        .map(project => this.deleteProject(project.id))
    );
    return deleteItem(join(this._path, CATEGORIES_PATH), id);
  }

  getProjects(): Promise<IProjectsState> {
    return getItems(join(this._path, PROJECTS_PATH));
  }

  setProject(project: IProject): Promise<void> {
    return setItem(join(this._path, PROJECTS_PATH), project.id, project);
  }

  async deleteProject(id: string): Promise<void> {
    const tests = await this.getTests();
    await Promise.all(
      Object.values(tests.items)
        .filter(test => test.projectId === id)
        .map(test => this.deleteTest(test.id))
    );
    return deleteItem(join(this._path, PROJECTS_PATH), id);
  }

  getTests(): Promise<ITestsState> {
    return getItems(join(this._path, TESTS_PATH));
  }

  setTest(test: ITest): Promise<void> {
    return setItem(join(this._path, TESTS_PATH), test.id, test);
  }

  deleteTest(id: string): Promise<void> {
    return deleteItem(join(this._path, TESTS_PATH), id);
  }
}
