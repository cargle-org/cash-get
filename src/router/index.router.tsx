import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRoot from "../screens/auth/root";
import OnboardingRoot from "../screens/onboarding/root";
import DashboardShopRoot from "../screens/dashboard/shop/root";
import DashboardAgentRoot from "../screens/dashboard/agent/root";

export type IndexRouterList = {
  onboarding: undefined;
  auth: undefined;
  "dashboard-shop": undefined;
  "dashboard-agent": undefined;
};

const IndexRouter = () => {
  const Stack = createNativeStackNavigator<IndexRouterList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboarding" component={OnboardingRoot} />
        <Stack.Screen name="auth" component={AuthRoot} />
        <Stack.Screen name="dashboard-shop" component={DashboardShopRoot} />
        <Stack.Screen name="dashboard-agent" component={DashboardAgentRoot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default IndexRouter;
