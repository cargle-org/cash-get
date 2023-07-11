import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./login";

const AuthRoot = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="login" component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthRoot;
