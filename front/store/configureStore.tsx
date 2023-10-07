import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import reducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const loggerMiddleware =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        console.log(action);
        return next(action);
      };
const configureStore = () => {
  const sagaaMiddleware = createSagaMiddleware();
  const middleware = [sagaaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
