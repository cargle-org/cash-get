import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgentOpenOrders from ".";
import ViewClosedOrdersSingleOrder from "./view-order";

export type SettledOrdersRootList = {
  "shop-settled-orders-all": undefined;
  "shop-settled-orders-single": { orderCollectionId: string };
};

const ShopSettledOrdersRoot = () => {
  const ActiveOrdersStack = createNativeStackNavigator<SettledOrdersRootList>();
  return (
    <ActiveOrdersStack.Navigator>
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
        }}
        name="shop-settled-orders-all"
        component={AgentOpenOrders}
      />
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="shop-settled-orders-single"
        component={ViewClosedOrdersSingleOrder}
      />
    </ActiveOrdersStack.Navigator>
  );
};

export default ShopSettledOrdersRoot;
