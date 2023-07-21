import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Orders from ".";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ShopActiveOrdersRoot from "./active-orders/root";
import ShopSettledOrdersRoot from "./settled-orders/root";
import CustomTabBar from "../../components/CustomTabBar";
import ShopOpenOrdersRoot from "./open-orders/root";

export type DashboardShopOrdersRootList = {
  "shop-orders-all": undefined;
  "shop-orders-single": { orderId: string };
};
const ShopOrdersRoot = () => {
  const ShopOrdersStack = createMaterialTopTabNavigator();
  return (
    <ShopOrdersStack.Navigator tabBar={(props) => <CustomTabBar {...props} />} initialRouteName="shop-orders-all">
      <ShopOrdersStack.Screen options={{ title: "Active" }} name="shop-active-orders" component={ShopActiveOrdersRoot} />
      <ShopOrdersStack.Screen options={{ title: "Open" }} name="shop-open-orders" component={ShopOpenOrdersRoot} />
      <ShopOrdersStack.Screen options={{ title: "Closed" }} name="shop-settled-orders" component={ShopSettledOrdersRoot} />
    </ShopOrdersStack.Navigator>
  );
};

export default ShopOrdersRoot;
