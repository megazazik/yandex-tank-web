import categoryValidation from "../category/validate";
import { ICategory } from "../category";

const validation = categoryValidation.fullObjectRules({
  notUniqueName: () => false
});

export default (category: ICategory, categories: ICategory[]) => {
  return (
    validation.validate(category) || isUniqueNameValidate(category, categories)
  );
};

function isUniqueNameValidate(
  category: ICategory,
  categories: ICategory[]
): ReturnType<typeof validation.validate> {
  return categories.some(c => c.name === category.name)
    ? [{ type: "notUniqueName" }]
    : null;
}
