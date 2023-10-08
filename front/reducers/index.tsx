import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:

      return action.payload;
    default: {
      const combinedReuducer = combineReducers({
        user,
        post
      });
      return combinedReuducer(state, action)
    }
  }

}
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
