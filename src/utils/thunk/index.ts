export default function createThunk<A extends {}, S, Args extends any[]>(
  thunkBuilder: (
    actions: A
  ) => (
    ...args: Args
  ) => (dispatch: (action: any) => void, getState: () => S) => void
) {
  return (actions: A, getComponentState: (fullState: any) => S) => (
    ...args: Args
  ) => (dispatch: (action: any) => void, getState: () => any) => {
    thunkBuilder(actions)(...args)(dispatch, () =>
      getComponentState(getState())
    );
  };
}
