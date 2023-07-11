import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LandingPage from "./landing-page";

const OnboardingRoot = () => {
  const OnboardingStack = createNativeStackNavigator();
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardingStack.Screen name="landing-page" component={LandingPage} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingRoot;
