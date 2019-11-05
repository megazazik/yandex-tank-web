import { IProject } from "../project";
import { IAction } from "encaps";
import itemsState, { IProjectsState } from "./items";
import uuid from "uuid/v4";
import thunk from "../../utils/thunk";
import { IStorage } from "../storage/interface";

export default itemsState
  .initState(state => ({ ...state, isProcesssing: false }))
  .handlers({
    setProcessing: (state, { payload }: IAction<boolean>) => ({
      ...state,
      isProcesssing: payload
    }),
    setItems: (state, { payload }: IAction<IProjectsState>) => ({
      ...state,
      ...payload
    })
  })
  .actionCreators({
    add: thunk(
      actions => (
        storage: IStorage,
        project: Omit<IProject, "id">
      ) => async dispatch => {
        try {
          dispatch(actions.setProcessing(true));
          await storage.setProject({ ...project, id: uuid() });
          const projects = await storage.getProjects();
          dispatch(actions.setItems(projects));
        } finally {
          dispatch(actions.setProcessing(false));
        }
      }
    ),
    edit: thunk(
      actions => (storage: IStorage, project: IProject) => async dispatch => {
        try {
          dispatch(actions.setProcessing(true));
          await storage.setProject(project);
          const projects = await storage.getProjects();
          dispatch(actions.setItems(projects));
        } finally {
          dispatch(actions.setProcessing(false));
        }
      }
    ),
    load: thunk(actions => (storage: IStorage) => async dispatch => {
      try {
        dispatch(actions.setProcessing(true));
        const projects = await storage.getProjects();
        dispatch(actions.setItems(projects));
      } finally {
        dispatch(actions.setProcessing(false));
      }
    }),
    remove: thunk(
      actions => (storage: IStorage, id: string) => async dispatch => {
        try {
          dispatch(actions.setProcessing(true));
          await storage.deleteProject(id);
          const projects = await storage.getProjects();
          dispatch(actions.setItems(projects));
        } finally {
          dispatch(actions.setProcessing(false));
        }
      }
    )
  });
