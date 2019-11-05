import * as React from "react";
import { ICategory } from ".";
import cn from "classnames";

export interface IProps {
  category: ICategory;
  onChange: (category: ICategory) => void;
  nameError?: string;
}

export default ({ onChange, category, nameError }: IProps) => {
  const onNameChanged = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...category,
        name: ev.target.value
      });
    },
    [category, onChange]
  );

  return (
    <form>
      <div className="form-group row">
        <label className="col-2 col-form-label">Название</label>
        <div className="col-10">
          <input
            type="text"
            className={cn("form-control", { ["is-invalid"]: !!nameError })}
            value={category.name || ""}
            onChange={onNameChanged}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>
      </div>
    </form>
  );
};
