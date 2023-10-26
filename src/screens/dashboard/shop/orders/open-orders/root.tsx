import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopOpenOrders from ".";
import ViewOpenOrdersSingleOrder from "./view-order";

export type OpenOrdersRootList = {
  "shop-open-orders-all": undefined;
  "shop-open-orders-single": { orderId: string };
};

const ShopOpenOrdersRoot = () => {
  const ActiveOrdersStack = createNativeStackNavigator<OpenOrdersRootList>();
  return (
    <ActiveOrdersStack.Navigator>
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
        }}
        name="shop-open-orders-all"
        component={ShopOpenOrders}
      />
      <ActiveOrdersStack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
        }}
        name="shop-open-orders-single"
        component={ViewOpenOrdersSingleOrder}
      />
    </ActiveOrdersStack.Navigator>
  );
};

export default ShopOpenOrdersRoot;
