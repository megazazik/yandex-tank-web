import test from "../test";
import { IProject } from "../project";
import { createMap, IAction } from "encaps";
import uuid from "uuid/v4";

const testsModel = createMap(test).handlers({
  add: (state, action: IAction<IProject>) => {
    const id = uuid();
    const newTest = test.reducer(
      undefined,
      test.actions.init({ project: action.payload, id })
    );

    return {
      ...state,
      items: {
        ...state.items,
        [id]: newTest
      }
    };
  },
  delete: (state, { payload }: IAction<string>) => {
    const newItems = { ...state.items };
    if (payload in newItems) {
      delete newItems[payload];
    }
    return {
      ...state,
      items: newItems
    };
  }
});

type ITetstState = ReturnType<typeof testsModel.reducer>;

export { ITetstState };

export default testsModel;
