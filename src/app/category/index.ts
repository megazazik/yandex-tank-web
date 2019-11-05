import { build } from "encaps";

export interface ICategory {
  name: string;
  id: string;
}

export default build()
  .initState<ICategory>(() => null)
  .handlers({
    setName: "name"
  });
