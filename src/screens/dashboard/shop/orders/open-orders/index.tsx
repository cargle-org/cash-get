import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SingleOpenOrder from "../components/single-open-order";
import { OpenOrdersRootList } from "./root";
import { RootState } from "../../../../../store/appSlice";
import { IOrderListItem } from "../../../../../services/types";
import { theme } from "../../../../../utils/theme";

const ShopOpenOrders = ({ navigation }: NativeStackScreenProps<OpenOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.shopOrders.openOrders);
  const handlePress = (item: IOrderListItem) => {
    // Handle press event for a list item
    navigation.navigate("agent-open-orders-single", { orderId: item.id });
  };
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
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
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ShopOpenOrders;
