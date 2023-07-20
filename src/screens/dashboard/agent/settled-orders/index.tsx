import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/appSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IOrderListItem } from "../../../../services/types";
import { DashboardAgentRootList } from "../root";
import SingleOrder from "../components/single-order";
import { SettledOrdersRootList } from "./root";
import DashboardAppBar from "../../components/DashboardAppBar";

const AgentSettledOrders = ({ navigation }: NativeStackScreenProps<SettledOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.closedOrders);
  const handlePress = (item: IOrderListItem) => {
    // Handle press event for a list item
    navigation.navigate("agent-settled-orders-single", { orderId: item.id });
  };
  return (
    <View style={{ flex: 1 }}>
      <DashboardAppBar navigate={navigation} />
      <FlatList
        style={{ backgroundColor: "#ffffff", paddingVertical: 32, paddingHorizontal: 16 }}
        contentContainerStyle={{
          display: "flex",
          gap: 12,
        }}
        data={orders}
        renderItem={({ item }) => (
          <SingleOrder
            amount={item.amount}
            status={item.status}
            agentName={item.agentName}
            agentId={item.agentId}
            agentNo={item.agentNo}
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AgentSettledOrders;
