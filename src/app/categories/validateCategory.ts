import categoryValidation from "../category/validate";
import { ICategory } from "../category";
import { init } from "@megazazik/validate";

export interface ICreateCategoryValidationState {
  category: ICategory;
  categories: ICategory[];
}

export default init<ICreateCategoryValidationState>()
  .rules({ category: categoryValidation })
  .fullObjectRules({
    notUniqueName: ({ categories, category }) =>
      categories.some(c => c.name === category.name && c.id !== category.id)
  });
