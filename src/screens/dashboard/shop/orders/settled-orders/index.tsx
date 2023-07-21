import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SingleOrder from "../components/single-order";
import { SettledOrdersRootList } from "./root";
import { RootState } from "../../../../../store/appSlice";
import { IOrderListItem } from "../../../../../services/types";
import { theme } from "../../../../../utils/theme";

const AgentSettledOrders = ({ navigation }: NativeStackScreenProps<SettledOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.closedOrders);
  const handlePress = (item: IOrderListItem) => {
    // Handle press event for a list item
    navigation.navigate("shop-settled-orders-single", { orderId: item.id });
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: theme.colors["dark-100"], paddingVertical: 32, paddingHorizontal: 16 }}
        contentContainerStyle={{
          display: "flex",
          gap: 12,
        }}
        data={orders}
        renderItem={({ item }) => (
          <SingleOrder
            orderId={item.id}
            time={item.deliveryPeriod}
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
