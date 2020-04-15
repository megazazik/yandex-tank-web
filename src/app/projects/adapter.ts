import { bindActionCreators } from "encaps";
import model from ".";
import { Dispatch } from "../../utils/dispatch";
import { IProjectsService } from "./service";

export const mapStateToProps = (state: ReturnType<typeof model.reducer>) =>
  state;

export const mapDispatchToProps = (
  service: IProjectsService,
  actions: typeof model.actions
) => (dispatch: Dispatch) => {
  const { add, edit, load, remove, ...rest } = bindActionCreators(
    actions,
    dispatch
  );
  return {
    ...rest,
    add: add.bind(null, service),
    edit: edit.bind(null, service),
    load: load.bind(null, service),
    remove: remove.bind(null, service)
  };
};

export type ViewProps = ReturnType<typeof mapStateToProps>;
export type ViewActions = ReturnType<ReturnType<typeof mapDispatchToProps>>;
