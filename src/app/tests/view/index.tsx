import * as React from "react";
import { parse, stringify } from "yaml";
import cn from "classnames";
import { useGetEventCallback } from "react-cached-callback";
import { IProject } from "../../project";
import testsState from "../../tests";
import { ICategory } from "../../category";
import TestItem from "./test";
import styles from "./styles.less";
import { reducer, actions } from "./reducer";
import { bindActionCreators } from "encaps";
import { ITest } from "../../test";

export interface IProps {
  category: ICategory;
  project: IProject;
  tests: ReturnType<typeof testsState.reducer>;
  onBackButtonClick: () => void;
  updateTests: () => void;
  runTest: (test: Pick<ITest, "projectId" | "phantomConfig">) => void;
  skipError: () => void;
}

export default ({
  project,
  tests,
  category,
  onBackButtonClick,
  runTest,
  skipError,
  updateTests
}: IProps) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, reducer);

  const boundAction = React.useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );

  const selectTest = useGetEventCallback((uid: string) => () => {
    boundAction.selectTest(uid);
  });

  const onConfigChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      boundAction.setConfig(event.currentTarget.value);
    },
    [boundAction]
  );

  let parsedConfig: string;
  let isParseError = false;
  try {
    parsedConfig = stringify({ phantom: parse(state.phantomConfig) });
  } catch {
    isParseError = true;
  }

  const onRunTestClick = React.useCallback(() => {
    runTest({ phantomConfig: state.phantomConfig, projectId: project.id });
  }, [boundAction]);

  const canRunTest =
    !isParseError && !!tests.runningTest && !!state.phantomConfig;

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <h3>
            {category.name} - {project.name} - Тесты{" "}
            {tests.isProcesssing && (
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
        {tests.failOnRun && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              Произошла ошибка при запуске теста!
              <br />
              <button
                type="button"
                className="btn btn-danger"
                onClick={skipError}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-info mr-2"
            onClick={onBackButtonClick}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-success mr-2"
            disabled={!canRunTest}
            onClick={canRunTest ? onRunTestClick : undefined}
          >
            Запустить
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={updateTests}
          >
            Обновить
          </button>
          {/*
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
          </button> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form>
            <div className="form-group row">
              <div className="col-6">
                <div className="form-group row">
                  <label className="col-12 col-form-label">
                    Enter phantom configuration:
                  </label>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows={6}
                      value={state.phantomConfig}
                      onChange={onConfigChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-6">
                {isParseError ? (
                  <div className="form-group row">
                    <div className="alert alert-danger" role="alert">
                      Could not parse config!
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group row">
                      <div className="col-12 col-form-label">
                        Result phantom config:
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <pre className={cn(styles.configPreview, "p-2")}>
                          <code>{parsedConfig}</code>
                        </pre>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Дата</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(tests.items).map(uid => (
                <TestItem
                  key={uid}
                  test={tests.items[uid]}
                  className={cn(styles.row, {
                    ["table-info"]: state.selectedTest === uid
                  })}
                  onClick={selectTest(uid)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
