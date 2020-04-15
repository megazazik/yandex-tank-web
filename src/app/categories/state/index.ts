import category from "../../category";
import { createMap } from "encaps";

const categoriesModel = createMap(category);

type ICategoriesState = ReturnType<typeof categoriesModel.reducer>;

export { ICategoriesState };

export default categoriesModel;
