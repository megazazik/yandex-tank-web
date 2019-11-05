import { build } from "encaps";

export interface IProject {
  name: string;
  id: string;
  categoryId: string;
}

export default build()
  .initState<IProject>(() => ({
    name: "",
    id: null,
    categoryId: null
  }))
  .handlers({
    setName: "name",
    setCategoryId: "categoryId"
  });
