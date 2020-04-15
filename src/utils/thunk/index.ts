import { bindActionCreators } from "encaps";
import { Dispatch } from "../dispatch";

export default function createThunk<A extends {}, S, Args extends any[]>(
  thunk: (...args: Args) => (dispatch: Dispatch & A, getState: () => S) => void
) {
  return (actions: A, getComponentState: (fullState: any) => S) => (
    ...args: Args
  ) => (dispatch: (action: any) => void, getState: () => any) => {
    const dispatchActions: any = (a: any) => dispatch(a);
    Object.assign(dispatchActions, bindActionCreators(actions, dispatch));
    thunk(...args)(dispatchActions, () => getComponentState(getState()));
  };
}
