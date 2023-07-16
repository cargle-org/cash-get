import React, { useEffect } from "react";
import { Icon } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/appSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AgentActiveOrders from "./active-orders";
import AgentActiveOrdersRoot from "./active-orders/root";
import AgentOpenOrdersRoot from "./open-orders/root";
import AgentSettledOrdersRoot from "./settled-orders/root";

export type DashboardAgentRootList = {
  "agent-active-orders": undefined;
  "agent-open-orders": undefined;
  "agent-settled-orders": undefined;
};

const DashboardAgentRoot = () => {
  const DashboardAgentNavigator = createMaterialTopTabNavigator<DashboardAgentRootList>();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <DashboardAgentNavigator.Navigator>
      <DashboardAgentNavigator.Screen name="agent-active-orders" component={AgentActiveOrdersRoot} />
      <DashboardAgentNavigator.Screen name="agent-open-orders" component={AgentOpenOrdersRoot} />
      <DashboardAgentNavigator.Screen name="agent-settled-orders" component={AgentSettledOrdersRoot} />
    </DashboardAgentNavigator.Navigator>
  );
};

export default DashboardAgentRoot;
