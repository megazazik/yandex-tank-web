import { IAction } from "encaps";
import { ICategory } from "../category";
import categories, { ICategorieState } from "./state";
import uuid from "uuid/v4";
import thunk from "../../utils/thunk";
import { IStorage } from "../storage/interface";

export default categories
  .initState(state => ({ ...state, isProcesssing: false }))
  .handlers({
    setProcessing: (state, { payload }: IAction<boolean>) => ({
      ...state,
      isProcesssing: payload
    }),
    setItems: (state, { payload }: IAction<ICategorieState>) => ({
      ...state,
      ...payload
    })
  })
  .actionCreators({
    add: thunk(
      actions => (
        storage: IStorage,
        category: Omit<ICategory, "id">
      ) => async dispatch => {
        try {
          dispatch(actions.setProcessing(true));
          await storage.setCategory({ ...category, id: uuid() });
          const categories = await storage.getCategories();
          dispatch(actions.setItems(categories));
        } finally {
          dispatch(actions.setProcessing(false));
        }
      }
    ),
    edit: thunk(
      actions => (storage: IStorage, category: ICategory) => async dispatch => {
        try {
          dispatch(actions.setProcessing(true));
          await storage.setCategory(category);
          const categories = await storage.getCategories();
          dispatch(actions.setItems(categories));
        } finally {
          dispatch(actions.setProcessing(false));
        }
      }
    ),
    load: thunk(actions => (storage: IStorage) => async dispatch => {
      try {
        dispatch(actions.setProcessing(true));
        const categories = await storage.getCategories();
        dispatch(actions.setItems(categories));
      } finally {
        dispatch(actions.setProcessing(false));
      }
    }),
    remove: thunk(
      actions => (storage: IStorage, id: string) => async dispatch => {
        try {
          dispatch(actions.setProcessing(true));
          await storage.deleteCategory(id);
          const categories = await storage.getCategories();
          dispatch(actions.setItems(categories));
        } finally {
          dispatch(actions.setProcessing(false));
        }
      }
    )
  });
