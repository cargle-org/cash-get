import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgentOpenOrders from ".";
import ViewClosedOrdersSingleOrder from "./view-order";

export type SettledOrdersRootList = {
  "agent-settled-orders-all": undefined;
  "agent-settled-orders-single": { orderCollectionId: string };
};

const AgentSettledOrdersRoot = () => {
  const ActiveOrdersStack = createNativeStackNavigator<SettledOrdersRootList>();
  return (
    <ActiveOrdersStack.Navigator>
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
        }}
        name="agent-settled-orders-all"
        component={AgentOpenOrders}
      />
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="agent-settled-orders-single"
        component={ViewClosedOrdersSingleOrder}
      />
    </ActiveOrdersStack.Navigator>
  );
};

export default AgentSettledOrdersRoot;
