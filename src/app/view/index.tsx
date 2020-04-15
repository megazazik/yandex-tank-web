import * as React from "react";
import CategoriesView from "../categories/view";
import state from "../state";
import viewState from "./state";
import { connect } from "react-redux";
import pageState from "../state";
import service from "../storage/request";
import { ICategory } from "../category";
import { IProject } from "../project";
import ProjectsView from "../projects/view";
import * as projects from "../projects/adapter";
import { createSelector } from "reselect";
import TestsView from "../tests/view";
import { ITest } from "../test";

const Categories = connect(
  (state: ReturnType<typeof pageState.reducer>) => ({
    categories: state.categories
  }),
  dispatch => ({
    addCategory: (category: { name: string }) =>
      dispatch(state.actions.categories.add(service, category) as any),
    deleteCategory: (name: string) =>
      dispatch(state.actions.categories.remove(service, name) as any),
    editCategory: (category: ICategory) =>
      dispatch(state.actions.categories.edit(service, category) as any)
  })
)(CategoriesView);

const selectProjects = createSelector(
  (state: ReturnType<typeof pageState.reducer>) => state.projects,
  (_: any, props: { categoryId: string }) => props.categoryId,
  (projects, categoryId) => ({
    ...projects,
    items: Object.values(projects.items)
      .filter(project => project.categoryId === categoryId)
      .reduce((prev, project) => ({ ...prev, [project.id]: project }), {})
  })
);

const selectTests = createSelector(
  (state: ReturnType<typeof pageState.reducer>) => state.tests,
  (_: any, props: { projectId: string }) => props.projectId,
  (tests, projectId) => ({
    ...tests,
    items: Object.values(tests.items)
      .filter(test => test.projectId === projectId)
      .reduce((prev, test) => ({ ...prev, [test.id]: test }), {})
  })
);

const Projects = connect(
  (
    state: ReturnType<typeof pageState.reducer>,
    props: { categoryId: string }
  ) => ({
    projects: selectProjects(state, props),
    category: state.categories.items[props.categoryId]
  }),
  dispatch => ({
    actions: projects.mapDispatchToProps(
      service,
      state.actions.projects
    )(dispatch)
  })
  // dispatch => ({
  //   addProject: (project: { name: string; categoryId: string }) =>
  //     dispatch(state.actions.projects.add(service, project) as any),
  //   deleteProject: (name: string) =>
  //     dispatch(state.actions.projects.remove(service, name) as any),
  //   editProject: (project: IProject) =>
  //     dispatch(state.actions.projects.edit(service, project) as any)
  // })
)(ProjectsView);

const Tests = connect(
  (
    state: ReturnType<typeof pageState.reducer>,
    { projectId }: { projectId: string }
  ) => ({
    project: state.projects.items[projectId],
    category:
      state.categories.items[state.projects.items[projectId].categoryId],
    tests: selectTests(state, { projectId })
  }),
  dispatch => ({
    updateTests: () => dispatch(state.actions.tests.load(service) as any),
    runTest: (test: Pick<ITest, "phantomConfig" | "projectId">) =>
      dispatch(state.actions.tests.runTest(service, test) as any),
    skipError: () => dispatch(state.actions.tests.setFailOnRun(false))
  })
)(TestsView);

const getView = (
  state: ReturnType<typeof viewState.reducer>,
  dispatch: (action: any) => void
) => {
  const onSelectCategory = React.useCallback(
    (category: ICategory) => {
      dispatch(viewState.actions.openCategory(category.id));
    },
    [dispatch]
  );

  const openCategories = React.useCallback(() => {
    dispatch(viewState.actions.openCategories());
  }, [dispatch]);

  const selectProject = React.useCallback(
    (project: IProject) => {
      dispatch(viewState.actions.openProject(project.id));
    },
    [dispatch]
  );

  const onCloseProject = React.useCallback(() => {
    dispatch(viewState.actions.closeProject());
  }, [dispatch]);

  switch (state.current) {
    case "categories":
      return <Categories onSelectCategory={onSelectCategory} />;
    case "category":
      return (
        <Projects
          onSelectProject={selectProject}
          categoryId={state.categoryId}
          onBackButtonClick={openCategories}
        />
      );
    case "project":
      return (
        <Tests projectId={state.projectId} onBackButtonClick={onCloseProject} />
      );
    default:
      return <h4>Неизвестное состояние</h4>;
  }
};

export default () => {
  const [state, dispatch] = React.useReducer(viewState.reducer, {
    current: "categories",
    categoryId: null
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2>Нагрузочное тестирование</h2>
        </div>
      </div>
      {getView(state, dispatch)}
    </div>
  );
};
