import React, { useEffect } from "react";
import { Icon } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/appSlice";
import AgentActiveOrders from "./active-orders";
import AgentActiveOrdersRoot from "./active-orders/root";
import AgentOpenOrdersRoot from "./open-orders/root";
import AgentSettledOrdersRoot from "./settled-orders/root";
import { View } from "react-native";
import DashboardAppBar from "../components/DashboardAppBar";
import { theme } from "../../../utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { firebaseService } from "../../../services/firebase.service";

export type DashboardAgentRootList = {
  "agent-active-orders": undefined;
  "agent-open-orders": undefined;
  "agent-settled-orders": undefined;
};

const DashboardAgentRoot = () => {
  const DashboardAgentNavigator = createBottomTabNavigator<DashboardAgentRootList>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const removeListener = firebaseService.listenForOrders(user!.id, user!.role);
    return () => {
      removeListener();
    };
  }, []);
  return (
    <DashboardAgentNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors["dark-300"],
        tabBarStyle: {
          backgroundColor: theme.colors["dark-500"],
          paddingBottom: 12,
          paddingTop: 12,
          height: 64,
          alignItems: "center",
        },
        tabBarIconStyle: {
          // padding: 16,
          alignItems: "center",
        },
      }}
    >
      <DashboardAgentNavigator.Screen
        name="agent-active-orders"
        component={AgentActiveOrdersRoot}
        options={{
          tabBarLabel: "Active Orders",
          tabBarIcon: ({ color }) => <Icon color={color} size={26} name="email-open" />,
        }}
      />
      <DashboardAgentNavigator.Screen
        name="agent-open-orders"
        component={AgentOpenOrdersRoot}
        options={{
          tabBarLabel: "Open Orders",
          tabBarIcon: ({ color }) => <Icon color={color} size={26} name="email" />,
        }}
      />
      <DashboardAgentNavigator.Screen
        name="agent-settled-orders"
        component={AgentSettledOrdersRoot}
        options={{
          tabBarLabel: "Closed Orders",
          tabBarIcon: ({ color }) => <Icon color={color} size={26} name="email-check" />,
        }}
      />
    </DashboardAgentNavigator.Navigator>
  );
};

export default DashboardAgentRoot;
