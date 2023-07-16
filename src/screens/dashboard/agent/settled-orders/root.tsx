import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgentOpenOrders from ".";
import AgentViewSingleOrder from "../components/view-order";

export type SettledOrdersRootList = {
  "agent-settled-orders-all": undefined;
  "agent-settled-orders-single": { orderId: string };
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
      <ActiveOrdersStack.Screen name="agent-settled-orders-single" component={AgentViewSingleOrder} />
    </ActiveOrdersStack.Navigator>
  );
};

export default AgentSettledOrdersRoot;
