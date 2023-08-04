import { AnyAction, Reducer, combineReducers, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { orderSlice } from "./orderSlice";

const appSlice = createSlice({
  name: "app",
  initialState: {
    firebaseToken: "",
  } as { firebaseToken: string },
  reducers: {
    clearStore() {},
    setFirebaseToken(state, action: PayloadAction<{ firebaseToken: string }>) {
      state.firebaseToken = action.payload.firebaseToken;
    },
  },
});

export const { clearStore, setFirebaseToken } = appSlice.actions;

const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  order: orderSlice.reducer,
});

export const rootReducer: Reducer = (state: ReturnType<typeof reducers>, action: AnyAction) => {
  console.log(AsyncStorage.getItem("persist:root"));
  if (action.type === "app/clearStore") {
    // this applies to all keys defined in persistConfig(s)
    AsyncStorage.removeItem("persist:root");
    // eslint-disable-next-line no-param-reassign
    state = {} as ReturnType<typeof reducers>;
  }
  return reducers(state, action);
};

export type RootState = ReturnType<typeof reducers>;
