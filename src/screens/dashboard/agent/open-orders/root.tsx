import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgentOpenOrders from ".";
import ViewOpenOrdersSingleOrder from "./view-order";

export type OpenOrdersRootList = {
  "agent-open-orders-all": undefined;
  "agent-open-orders-single": { orderId: string };
};

const AgentActiveOrdersRoot = () => {
  const ActiveOrdersStack = createNativeStackNavigator<OpenOrdersRootList>();
  return (
    <ActiveOrdersStack.Navigator>
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
        }}
        name="agent-open-orders-all"
        component={AgentOpenOrders}
      />
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="agent-open-orders-single"
        component={ViewOpenOrdersSingleOrder}
      />
    </ActiveOrdersStack.Navigator>
  );
};

export default AgentActiveOrdersRoot;
