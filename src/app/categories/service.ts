import { ICategoriesState } from "./state";
import { ICategory } from "../category";

export interface ICategoriesService {
  getCategories(): Promise<ICategoriesState>;
  setCategory(category: ICategory): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
