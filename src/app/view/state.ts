import { build, IAction } from "encaps";

export type State =
  | {
      current: "categories";
    }
  | {
      current: "category";
      categoryId: string;
    }
  | {
      current: "project";
      projectId: string;
    };

export default build()
  .initState<State>(() => ({ current: "categories" }))
  .handlers({
    openCategories: () => ({ current: "categories" }),
    openCategory: (_, action: IAction<string>) => ({
      current: "category",
      categoryId: action.payload
    }),
    openProject: (_, action: IAction<string>) => ({
      current: "project",
      projectId: action.payload
    })
  });
