import React from "react";
import IndexRouter from "./router/index.router";
import { IconComponent, IconComponentProvider } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { persistor, store } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";

const Main = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <IndexRouter />
          </IconComponentProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default Main;
