import React, { useEffect, useRef } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CreateOrder from "./create-order";
import { Icon } from "@react-native-material/core";
import ShopOrdersRoot from "./orders/root";
import { firebaseService } from "../../../services/firebase.service";
import { theme } from "../../../utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setFirebaseToken } from "../../../store/appSlice";
import generatePushNotificationsToken from "../../../utils/pushNotifications";
import {
  Subscription,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription,
} from "expo-notifications";
import { AxiosError } from "axios";

type DashboardShopRootList = {
  "shop-create-order": undefined;
  "shop-view-orders": undefined;
};

const DashboardShopRoot = () => {
  const dispatch = useDispatch();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const DashboardNavigator = createBottomTabNavigator<DashboardShopRootList>();
  const user = useSelector((state: RootState) => state.auth.user);

  const firebaseToken = useSelector((state: RootState) => state.app.firebaseToken);
  useEffect(() => {
    console.log({ firebaseToken });

    if (!firebaseToken) {
      generatePushNotificationsToken().then((token) => {
        if (!token) return;
        firebaseService
          .updateShopToken({
            shopId: user!.id,
            notificationToken: token,
          })
          .then((res) => {
            console.log(res);
            dispatch(setFirebaseToken({ firebaseToken: token }));
          })
          .catch((err: AxiosError) => console.log(err.response?.data));
      });
    }

    notificationListener.current = addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    responseListener.current = addNotificationResponseReceivedListener((response) => {
      console.log({ response });
    });

    return () => {
      removeNotificationSubscription(notificationListener.current as Subscription);
      removeNotificationSubscription(responseListener.current as Subscription);
    };
  }, [firebaseToken]);

  useEffect(() => {
    const removeListener = firebaseService.listenForOrders(user!.id, user!.role);
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
          tabBarLabel: "Create Order",
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
