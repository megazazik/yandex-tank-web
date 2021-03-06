import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import View from "./view";
import state from "./state";
import thunk from "redux-thunk";
import service from "./storage/request";

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
};

export default () => {
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    state.reducer,
    state.reducer(undefined, { type: "__init" }),
    composeEnhancers(applyMiddleware(thunk))
  );

  store.dispatch(state.actions.categories.load(service) as any);
  store.dispatch(state.actions.projects.load(service) as any);
  store.dispatch(state.actions.tests.load(service) as any);

  render(
    <Provider store={store}>
      <View />
    </Provider>,
    document.getElementById("content")
  );
};
