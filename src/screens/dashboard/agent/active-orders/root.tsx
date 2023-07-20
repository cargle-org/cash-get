import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgentActiveOrders from ".";
import AgentViewSingleOrder from "../components/view-order";
import ViewOpenOrdersSingleOrder from "./view-order";

export type ActiveOrdersRootList = {
  "agent-active-orders-all": undefined;
  "agent-active-orders-single": { orderId: string };
};

const ActiveOrdersRoot = () => {
  const ActiveOrdersStack = createNativeStackNavigator<ActiveOrdersRootList>();
  return (
    <ActiveOrdersStack.Navigator>
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
        }}
        name="agent-active-orders-all"
        component={AgentActiveOrders}
      />
      <ActiveOrdersStack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
        }}
        name="agent-active-orders-single"
        component={ViewOpenOrdersSingleOrder}
      />
    </ActiveOrdersStack.Navigator>
  );
};

export default ActiveOrdersRoot;
