import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/appSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IOrderListItem } from "../../../../services/types";
import { DashboardAgentRootList } from "../root";
import SingleOrder from "../components/single-order";
import { OpenOrdersRootList } from "./root";
import DashboardAppBar from "../../components/DashboardAppBar";
import { theme } from "../../../../utils/theme";

const AgentOpenOrders = ({ navigation }: NativeStackScreenProps<OpenOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.agentOrders.openOrders);
  const handlePress = (item: IOrderListItem) => {
    // Handle press event for a list item
    navigation.navigate("agent-open-orders-single", { orderId: item.id });
  };
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <FlatList
        style={{ backgroundColor: theme.colors["dark-100"], paddingVertical: 32, paddingHorizontal: 16, flex: 1 }}
        contentContainerStyle={{
          gap: 12,
          flex: 1,
        }}
        contentInset={{ bottom: 100 }}
        data={orders}
        renderItem={({ item }) => (
          <SingleOrder
            time={item.deliveryPeriod}
            orderId={item.id}
            amount={item.remainingAmount}
            status={item.status}
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AgentOpenOrders;
