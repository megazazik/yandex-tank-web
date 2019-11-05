import * as React from "react";
import CategoriesView from "../categories/view";
import state from "../state";
import viewState from "./state";
import { connect } from "react-redux";
import pageState from "../state";
import storage from "../storage/request";
import { ICategory } from "../category";
import { IProject } from "../project";
import ProjectsView from "../projects/view";
import { createSelector } from "reselect";

const Categories = connect(
  (state: ReturnType<typeof pageState.reducer>) => ({
    categories: state.categories
  }),
  dispatch => ({
    addCategory: (category: { name: string }) =>
      dispatch(state.actions.categories.add(storage, category) as any),
    deleteCategory: (name: string) =>
      dispatch(state.actions.categories.remove(storage, name) as any),
    editCategory: (category: ICategory) =>
      dispatch(state.actions.categories.edit(storage, category) as any)
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

const Projects = connect(
  (
    state: ReturnType<typeof pageState.reducer>,
    props: { categoryId: string }
  ) => ({
    projects: selectProjects(state, props),
    category: state.categories.items[props.categoryId]
  }),
  dispatch => ({
    addProject: (project: { name: string; categoryId: string }) =>
      dispatch(state.actions.projects.add(storage, project) as any),
    deleteProject: (name: string) =>
      dispatch(state.actions.projects.remove(storage, name) as any),
    editProject: (project: IProject) =>
      dispatch(state.actions.projects.edit(storage, project) as any)
  })
)(ProjectsView);

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

  switch (state.current) {
    case "categories":
      return <Categories onSelectCategory={onSelectCategory} />;
    case "category":
      return (
        <Projects
          onSelectProject={() => {}}
          categoryId={state.categoryId}
          onBackButtonClick={openCategories}
        />
      );
    default:
      return <h4>Неизвестное состояние</h4>;
  }
};

export default () => {
  const [state, dispatch] = React.useReducer(viewState.reducer, {
    current: "categories"
  });

  return (
    <>
      <h2>Нагрузочное тестирование</h2>
      {getView(state, dispatch)}
    </>
  );
};
