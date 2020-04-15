import { IProject } from "../project";
import { IAction } from "encaps";
import itemsState, { IProjectsState } from "./items";
import uuid from "uuid/v4";
import thunk from "../../utils/thunk";
import { IProjectsService } from "./service";

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
      (
        service: IProjectsService,
        project: Omit<IProject, "id">
      ) => async dispatch => {
        try {
          dispatch.setProcessing(true);
          await service.setProject({ ...project, id: uuid() });
          const projects = await service.getProjects();
          dispatch.setItems(projects);
        } finally {
          dispatch.setProcessing(false);
        }
      }
    ),
    edit: thunk(
      (service: IProjectsService, project: IProject) => async dispatch => {
        try {
          dispatch.setProcessing(true);
          await service.setProject(project);
          const projects = await service.getProjects();
          dispatch.setItems(projects);
        } finally {
          dispatch.setProcessing(false);
        }
      }
    ),
    load: thunk((service: IProjectsService) => async dispatch => {
      try {
        dispatch.setProcessing(true);
        const projects = await service.getProjects();
        dispatch.setItems(projects);
      } finally {
        dispatch.setProcessing(false);
      }
    }),
    remove: thunk((service: IProjectsService, id: string) => async dispatch => {
      try {
        dispatch.setProcessing(true);
        await service.deleteProject(id);
        const projects = await service.getProjects();
        dispatch.setItems(projects);
      } finally {
        dispatch.setProcessing(false);
      }
    })
  });
