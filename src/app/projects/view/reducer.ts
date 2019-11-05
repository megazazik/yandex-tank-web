import { build, IAction } from "encaps";
import { IProject } from "../../project";

export interface IState {
  project: IProject;
  validation: boolean;
  isPopupOpen: boolean;
  selectedProject?: string;
  isNewProject?: boolean;
}

export const { reducer, actions } = build()
  .initState<IState>(() => ({
    project: { name: "", id: "", categoryId: null },
    validation: false,
    isPopupOpen: false,
    selectedProject: null
  }))
  .handlers({
    setValidation: (state, action: IAction<boolean>) => ({
      ...state,
      validation: action.payload
    }),
    setProject: (state, action: IAction<IProject>) => ({
      ...state,
      project: action.payload
    }),
    createProject: (state, { payload }: IAction<string>) => ({
      ...state,
      project: { name: "", id: "", categoryId: payload },
      validation: false,
      isPopupOpen: true,
      isNewProject: true
    }),
    editProject: (state, { payload }: IAction<IProject>) => ({
      ...state,
      project: payload,
      validation: false,
      isPopupOpen: true,
      isNewProject: false
    }),
    closePopup: state => ({ ...state, isPopupOpen: false }),
    selectProject: (state, { payload }: IAction<string>) => ({
      ...state,
      selectedProject: payload
    })
  });
