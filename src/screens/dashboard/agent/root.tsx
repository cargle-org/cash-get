import React, { useEffect, useRef } from "react";
import { Icon } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setFirebaseToken } from "../../../store/appSlice";
import AgentActiveOrders from "./active-orders";
import AgentActiveOrdersRoot from "./active-orders/root";
import AgentOpenOrdersRoot from "./open-orders/root";
import AgentSettledOrdersRoot from "./settled-orders/root";
import { View } from "react-native";
import DashboardAppBar from "../components/DashboardAppBar";
import { theme } from "../../../utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { firebaseService } from "../../../services/firebase.service";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabBar from "../components/CustomTabBar";
import generatePushNotificationsToken from "../../../utils/pushNotifications";
import {
  Subscription,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription,
} from "expo-notifications";

export type DashboardAgentRootList = {
  "agent-active-orders": undefined;
  "agent-open-orders": undefined;
  "agent-settled-orders": undefined;
};

const DashboardAgentRoot = () => {
  // const DashboardAgentNavigator = createBottomTabNavigator<DashboardAgentRootList>();
  const dispatch = useDispatch();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const DashboardAgentNavigator = createMaterialTopTabNavigator<DashboardAgentRootList>();
  const user = useSelector((state: RootState) => state.auth.user);
  const firebaseToken = useSelector((state: RootState) => state.app.firebaseToken);

  useEffect(() => {
    if (!firebaseToken) {
      generatePushNotificationsToken().then((token) => {
        if (!token) return;
        firebaseService.updateAgentToken({
          agentId: user!.id,
          notificationToken: token,
        });
        dispatch(setFirebaseToken({ firebaseToken: token }));
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
    const removeOrderListener = firebaseService.listenForOrders(user!.id, user!.role);
    const removeOrderCollectionsListerner = firebaseService.listenForOrderCollections(user!.id);
    // return () => {
    //   removeOrderListener();
    //   removeOrderCollectionsListerner();
    // };
  }, []);
  return (
    <DashboardAgentNavigator.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <DashboardAgentNavigator.Screen options={{ title: "Active" }} name="agent-active-orders" component={AgentActiveOrdersRoot} />
      <DashboardAgentNavigator.Screen options={{ title: "Open" }} name="agent-open-orders" component={AgentOpenOrdersRoot} />
      <DashboardAgentNavigator.Screen options={{ title: "Closed" }} name="agent-settled-orders" component={AgentSettledOrdersRoot} />
    </DashboardAgentNavigator.Navigator>
  );
};

export default DashboardAgentRoot;
