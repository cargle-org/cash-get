import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRoot from "../screens/auth/root";
import OnboardingRoot from "../screens/onboarding/root";
import DashboardRoot from "../screens/dashboard/root";

const IndexRouter = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboarding" component={OnboardingRoot} />
        <Stack.Screen name="auth" component={AuthRoot} />
        <Stack.Screen name="dashboard" component={DashboardRoot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default IndexRouter;
