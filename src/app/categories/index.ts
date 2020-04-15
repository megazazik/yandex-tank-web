import { IAction } from "encaps";
import { ICategory } from "../category";
import categories, { ICategoriesState } from "./state";
import uuid from "uuid/v4";
import thunk from "../../utils/thunk";
import { ICategoriesService } from "./service";

export default categories
  .initState(state => ({ ...state, isProcesssing: false }))
  .handlers({
    setProcessing: (state, { payload }: IAction<boolean>) => ({
      ...state,
      isProcesssing: payload
    }),
    setItems: (state, { payload }: IAction<ICategoriesState>) => ({
      ...state,
      ...payload
    })
  })
  .actionCreators({
    add: thunk(
      (
        service: ICategoriesService,
        category: Omit<ICategory, "id">
      ) => async dispatch => {
        try {
          dispatch.setProcessing(true);
          await service.setCategory({ ...category, id: uuid() });
          const categories = await service.getCategories();
          dispatch.setItems(categories);
        } finally {
          dispatch.setProcessing(false);
        }
      }
    ),
    edit: thunk(
      (service: ICategoriesService, category: ICategory) => async dispatch => {
        try {
          dispatch.setProcessing(true);
          await service.setCategory(category);
          const categories = await service.getCategories();
          dispatch.setItems(categories);
        } finally {
          dispatch.setProcessing(false);
        }
      }
    ),
    load: thunk((service: ICategoriesService) => async dispatch => {
      try {
        dispatch.setProcessing(true);
        const categories = await service.getCategories();
        dispatch.setItems(categories);
      } finally {
        dispatch.setProcessing(false);
      }
    }),
    remove: thunk(
      (service: ICategoriesService, id: string) => async dispatch => {
        try {
          dispatch.setProcessing(true);
          await service.deleteCategory(id);
          const categories = await service.getCategories();
          dispatch.setItems(categories);
        } finally {
          dispatch.setProcessing(false);
        }
      }
    )
  });
