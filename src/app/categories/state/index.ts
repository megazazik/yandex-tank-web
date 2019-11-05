import category from "../../category";
import { createMap } from "encaps";

const categoriesModel = createMap(category);

type ICategorieState = ReturnType<typeof categoriesModel.reducer>;

export { ICategorieState };

export default categoriesModel;
