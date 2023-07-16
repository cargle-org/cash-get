import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Orders from ".";
import ViewSingleOrder from "./components/view-order";

export type DashboardShopOrdersRootList = {
  "shop-orders-all": undefined;
  "shop-orders-single": { orderId: string };
};
const ShopOrdersRoot = () => {
  const ShopOrdersStack = createNativeStackNavigator();
  return (
    <ShopOrdersStack.Navigator initialRouteName="shop-orders-all">
      <ShopOrdersStack.Screen
        options={{
          headerShown: false,
        }}
        name="shop-orders-all"
        component={Orders}
      />
      <ShopOrdersStack.Screen
        // options={{
        //   presentation: "modal",
        // }}
        name="shop-orders-single"
        component={ViewSingleOrder}
      />
    </ShopOrdersStack.Navigator>
  );
};

export default ShopOrdersRoot;
