import * as React from "react";
import { IProject } from ".";
import cn from "classnames";

export interface IProps {
  project: IProject;
  onChange: (project: IProject) => void;
  nameError?: string;
}

export default ({ onChange, project, nameError }: IProps) => {
  const onNameChanged = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...project,
        name: ev.target.value
      });
    },
    [project, onChange]
  );

  return (
    <form>
      <div className="form-group row">
        <label className="col-2 col-form-label">Название</label>
        <div className="col-10">
          <input
            type="text"
            className={cn("form-control", { ["is-invalid"]: !!nameError })}
            value={project.name || ""}
            onChange={onNameChanged}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>
      </div>
    </form>
  );
};
