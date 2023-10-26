import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettledOrdersRootList } from "./root";
import { RootState } from "../../../../../store/appSlice";
import { theme } from "../../../../../utils/theme";
import SingleShopOrder from "../components/single-order";
import SingleOpenOrder from "../components/single-open-order";

const AgentSettledOrders = ({ navigation }: NativeStackScreenProps<SettledOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.shopOrders.closedOrders);
  const handlePress = (orderId: string) => {
    // Handle press event for a list item
    navigation.navigate("shop-settled-orders-single", { orderId });
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
          <SingleOpenOrder
            time={item.deliveryPeriod}
            orderId={item.id}
            amount={item.amount}
            status={item.status}
            remainingAmount={item.remainingAmount}
            onPress={() => handlePress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AgentSettledOrders;
