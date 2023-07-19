import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CreateOrder from "./create-order";
import { Icon } from "@react-native-material/core";
import ShopOrdersRoot from "./orders/root";
import { firebaseService } from "../../../services/firebase.service";
import { theme } from "../../../utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

type DashboardShopRootList = {
  "shop-create-order": undefined;
  "shop-view-orders": undefined;
};

const DashboardShopRoot = () => {
  const DashboardNavigator = createBottomTabNavigator<DashboardShopRootList>();
  useEffect(() => {
    const removeListener = firebaseService.listenForOrders();
    return () => {
      removeListener();
    };
  }, []);
  return (
    <DashboardNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors["dark-300"],
        tabBarStyle: {
          backgroundColor: theme.colors["dark-500"],
          paddingBottom: 12,
          paddingTop: 12,
          height: 64,
          alignItems: "center",
        },
        tabBarIconStyle: {
          // padding: 16,
          alignItems: "center",
        },
      }}
    >
      <DashboardNavigator.Screen
        name="shop-create-order"
        component={CreateOrder}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Icon color={color} size={26} name="home" />,
        }}
      />
      <DashboardNavigator.Screen
        name="shop-view-orders"
        component={ShopOrdersRoot}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color }) => <Icon color={color} size={26} name="cart-arrow-up" />,
        }}
      />
    </DashboardNavigator.Navigator>
  );
};

export default DashboardShopRoot;
