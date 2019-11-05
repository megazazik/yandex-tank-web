import { build, IAction } from "encaps";
import { ICategory } from "../../category";

export interface IState {
  category: ICategory;
  validation: boolean;
  isPopupOpen: boolean;
  selectedCategory?: string;
  isNewCategory?: boolean;
}

export const { reducer, actions } = build()
  .initState<IState>(() => ({
    category: { name: "", id: "" },
    validation: false,
    isPopupOpen: false,
    selectedCategory: null
  }))
  .handlers({
    setValidation: (state, action: IAction<boolean>) => ({
      ...state,
      validation: action.payload
    }),
    setCategory: (state, action: IAction<ICategory>) => ({
      ...state,
      category: action.payload
    }),
    createCategory: state => ({
      ...state,
      category: { name: "", id: "" },
      validation: false,
      isPopupOpen: true,
      isNewCategory: true
    }),
    editCategory: (state, { payload }: IAction<ICategory>) => ({
      ...state,
      category: payload,
      validation: false,
      isPopupOpen: true,
      isNewCategory: false
    }),
    closePopup: state => ({ ...state, isPopupOpen: false }),
    selectCategory: (state, { payload }: IAction<string>) => ({
      ...state,
      selectedCategory: payload
    })
  });
