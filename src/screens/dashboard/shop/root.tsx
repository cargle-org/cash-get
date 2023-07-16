import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CreateOrder from "./create-order";
import { Icon } from "@react-native-material/core";
import ShopOrdersRoot from "./orders/root";
import { firebaseService } from "../../../services/firebase.service";

type DashboardShopRootList = {
  "shop-create-order": undefined;
  "shop-view-orders": undefined;
};

const DashboardShopRoot = () => {
  const DashboardNavigator = createMaterialBottomTabNavigator<DashboardShopRootList>();
  useEffect(() => {
    const removeListener = firebaseService.listenForOrders();
    return () => {
      removeListener();
    };
  }, []);
  return (
    <DashboardNavigator.Navigator>
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

export default DashboardShopRoot;
