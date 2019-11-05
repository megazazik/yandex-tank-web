import * as React from "react";
import Modal from "../../../utils/modal";
import projects from "..";
import ProjectEditForm from "../../project/view";
import { reducer, actions } from "./reducer";
import { bindActionCreators } from "encaps";
import validate from "../validateProjects";
import ProjectItem from "./project";
import cn from "classnames";
import styles from "./styles.less";
import { useGetEventCallback, useEventCallback } from "react-cached-callback";
import { IProject } from "../../project";
import { ICategory } from "../../category";

export type Props = {
  category: ICategory;
  projects: ReturnType<typeof projects.reducer>;
  addProject: (project: {name: string}) => void;
  deleteProject: (id: string) => void;
  editProject: (project: IProject) => void;
  onSelectProject: (project: IProject) => void;
  onBackButtonClick: () => void;
};

export default (props: Props) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, reducer);

  const boundAction = React.useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );

  const onCreateProject = React.useCallback(() => {
    const errors = validate(state.project, Object.values(props.projects.items));

    if (errors) {
      boundAction.setValidation(true);
    } else {
      boundAction.closePopup();
      if (state.isNewProject) {
        props.addProject(state.project);
      } else {
        props.editProject(state.project);
      }
    }
  }, [state.project, props.addProject]);

  const onCreateProjectClick = React.useCallback(() => {
    boundAction.createProject(props.category.id);
  }, []);

  const closeCreateProjectModal = React.useCallback(() => {
    boundAction.closePopup();
  }, []);

  const selectProject = useGetEventCallback((uid: string) => () => {
    boundAction.selectProject(uid)
  })

  const errors = state.validation
    ? validate(state.project, Object.values(props.projects.items))
    : null;

  const onDeleteProject = useEventCallback(() => {
    if (state.selectedProject) {
      props.deleteProject(state.selectedProject);
    }
  });

  const onEditProject = useEventCallback(() => {
    if (state.selectedProject) {
      boundAction.editProject(props.projects.items[state.selectedProject]);
    }
  });

  const onSelectProject = useGetEventCallback((id: string) => () => {
      props.onSelectProject(props.projects.items[id]);
  });

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h3>{props.category.name} - Проекты{' '}
            {props.projects.isProcesssing && (
            <div className="spinner-border" style={{width: '1.8rem', height: '1.8rem'}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            )}
          </h3>
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-info mr-2"
            onClick={props.onBackButtonClick}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-success mr-2"
            disabled={!state.selectedProject}
            onClick={state.selectedProject ? onSelectProject(state.selectedProject) : undefined}
          >
            Открыть
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={onCreateProjectClick}
          >
            Добавить
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onEditProject}
            disabled={!state.selectedProject}
          >
            Изменить
          </button>
          <button
					  type="button"
            className="btn btn-secondary"
            onClick={onDeleteProject}
					  disabled={!state.selectedProject}
				  >
					  Удалить
          </button>
          
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Название</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(props.projects.items).map(uid => (
                <ProjectItem
                  key={uid}
                  project={props.projects.items[uid]}
                  className={cn(styles.row, { ['table-info']: state.selectedProject === uid })}
                  onClick={selectProject(uid)}
                  onDoubleClick={onSelectProject(uid)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        labelId="categoriesModalLabel"
        title="Создать проект"
        onConfirm={onCreateProject}
        onClose={closeCreateProjectModal}
        isOpen={state.isPopupOpen}
      >
        <ProjectEditForm
          project={state.project}
          onChange={boundAction.setProject}
          nameError={getErrorName(errors)}
        />
      </Modal>
    </>
  );
};

function getErrorName(errors: ReturnType<typeof validate>) {

  if(errors?.name?.[0]?.type === 'required') {
    return 'Не заполнено название';
  }

  if(errors?.[0].type === 'notUniqueName') {
    return 'Такое название уже существует'
  }

  return undefined;
}
