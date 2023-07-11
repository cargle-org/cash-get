import React from "react";
import IndexRouter from "./router/index.router";
import { IconComponentProvider } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Main = () => {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <IndexRouter />
    </IconComponentProvider>
  );
};

export default Main;
