import { build, IAction } from "encaps";

export type State =
  | {
      current: "categories";
      categoryId: string;
    }
  | {
      current: "category";
      categoryId: string;
    }
  | {
      current: "project";
      projectId: string;
      categoryId: string;
    };

export default build()
  .initState<State>(() => ({ current: "categories", categoryId: null }))
  .handlers({
    openCategories: state => ({ ...state, current: "categories" }),
    openCategory: (_, action: IAction<string>) => ({
      current: "category",
      categoryId: action.payload
    }),
    openProject: (state, action: IAction<string>) => ({
      ...state,
      current: "project",
      projectId: action.payload
    }),
    closeProject: state => ({
      categoryId: state.categoryId,
      current: "category"
    })
  });
