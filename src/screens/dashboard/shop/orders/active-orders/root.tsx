import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgentActiveOrders from ".";
import ViewOpenOrdersSingleOrder from "./view-order";
import ViewOpenOrdersSingleOrderCollection from "./view-order-collection";

export type ActiveOrdersRootList = {
  "shop-active-orders-all": undefined;
  "shop-active-orders-single-collection": { orderCollectionId: string; orderId: string };
  "shop-active-orders-single": { orderId: string };
};

const ShopActiveOrdersRoot = () => {
  const ActiveOrdersStack = createNativeStackNavigator<ActiveOrdersRootList>();
  return (
    <ActiveOrdersStack.Navigator>
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
        }}
        name="shop-active-orders-all"
        component={AgentActiveOrders}
      />
      <ActiveOrdersStack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
        }}
        name="shop-active-orders-single-collection"
        component={ViewOpenOrdersSingleOrderCollection}
      />
      <ActiveOrdersStack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
        }}
        name="shop-active-orders-single"
        component={ViewOpenOrdersSingleOrder}
      />
    </ActiveOrdersStack.Navigator>
  );
};

export default ShopActiveOrdersRoot;
