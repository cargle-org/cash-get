import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CreateOrder from "./shop/create-order";
import { Icon } from "@react-native-material/core";
import ShopOrdersRoot from "./shop/orders/root";

const DashboardRoot = () => {
  const DashboardNavigator = createMaterialBottomTabNavigator();
  return (
    <DashboardNavigator.Navigator initialRouteName="Home">
      <DashboardNavigator.Group>
        <DashboardNavigator.Screen
          name="shop-create-order"
          component={CreateOrder}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => <Icon name="home" size={26} />,
          }}
        />
        <DashboardNavigator.Screen
          name="shop-view-orders"
          component={ShopOrdersRoot}
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: () => <Icon size={26} name="cart-arrow-up" />,
          }}
        />
      </DashboardNavigator.Group>
    </DashboardNavigator.Navigator>
  );
};

export default DashboardRoot;
