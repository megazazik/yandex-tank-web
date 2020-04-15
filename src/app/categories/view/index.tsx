import * as React from "react";
import Modal from "../../../utils/modal";
import categories from "..";
import CategoryEditForm from "../../category/view";
import { reducer, actions } from "./reducer";
import { bindActionCreators } from "encaps";
import validationScheme from "../validateCategory";
import CategoryItem from "./category";
import cn from "classnames";
import styles from "./styles.less";
import { useGetEventCallback, useEventCallback } from "react-cached-callback";
import { ICategory } from "../../category";

export type Props = {
  categories: ReturnType<typeof categories.reducer>;
  addCategory: (category: { name: string }) => void;
  deleteCategory: (id: string) => void;
  editCategory: (category: ICategory) => void;
  onSelectCategory: (category: ICategory) => void;
};

export default (props: Props) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, reducer);

  const boundAction = React.useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );

  const onCreateCategory = React.useCallback(() => {
    const errors = validationScheme.validate({
      category: state.category,
      categories: Object.values(props.categories.items)
    });

    if (errors) {
      boundAction.setValidation(true);
    } else {
      boundAction.closePopup();
      if (state.isNewCategory) {
        props.addCategory(state.category);
      } else {
        props.editCategory(state.category);
      }
    }
  }, [state.category, props.addCategory]);

  const onCreateCategoryClick = React.useCallback(() => {
    boundAction.createCategory();
  }, []);

  const closeCreateCategoryModal = React.useCallback(() => {
    boundAction.closePopup();
  }, []);

  const selectCategory = useGetEventCallback((uid: string) => () => {
    boundAction.selectCategory(uid);
  });

  const errors = state.validation
    ? validationScheme.validate({
        category: state.category,
        categories: Object.values(props.categories.items)
      })
    : null;

  const onDeleteCategory = useEventCallback(() => {
    if (state.selectedCategory) {
      props.deleteCategory(state.selectedCategory);
    }
  });

  const onEditCategory = useEventCallback(() => {
    if (state.selectedCategory) {
      boundAction.editCategory(props.categories.items[state.selectedCategory]);
    }
  });

  const onSelectCategory = useGetEventCallback((id: string) => () => {
    props.onSelectCategory(props.categories.items[id]);
  });

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h3 className="">
            Категории{" "}
            {props.categories.isProcesssing && (
              <div
                className="spinner-border"
                style={{ width: "1.8rem", height: "1.8rem" }}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </h3>
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-success mr-2"
            disabled={!state.selectedCategory}
            onClick={
              state.selectedCategory
                ? onSelectCategory(state.selectedCategory)
                : undefined
            }
          >
            Открыть
          </button>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={onCreateCategoryClick}
          >
            Добавить
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onEditCategory}
            disabled={!state.selectedCategory}
          >
            Изменить
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onDeleteCategory}
            disabled={!state.selectedCategory}
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
              {Object.keys(props.categories.items).map(uid => (
                <CategoryItem
                  key={uid}
                  category={props.categories.items[uid]}
                  className={cn(styles.row, {
                    ["table-info"]: state.selectedCategory === uid
                  })}
                  onClick={selectCategory(uid)}
                  onDoubleClick={onSelectCategory(uid)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        labelId="categoriesModalLabel"
        title="Создать категорию"
        onConfirm={onCreateCategory}
        onClose={closeCreateCategoryModal}
        isOpen={state.isPopupOpen}
      >
        <CategoryEditForm
          category={state.category}
          onChange={boundAction.setCategory}
          nameError={getErrorName(errors)}
        />
      </Modal>
    </>
  );
};

function getErrorName(errors: ReturnType<typeof validationScheme.validate>) {
  if (errors?.category?.name?.[0]?.type === "required") {
    return "Не заполнено название";
  }

  if (errors?.[0].type === "notUniqueName") {
    return "Такое название уже существует";
  }

  return undefined;
}
