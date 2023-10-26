import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActiveOrdersRootList } from "./root";
import { RootState } from "../../../../../store/appSlice";
import { theme } from "../../../../../utils/theme";
import SingleShopOrder from "../components/single-order";

const AgentActiveOrders = ({ navigation }: NativeStackScreenProps<ActiveOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.shopOrders.activeOrders);
  const handlePress = (orderId: string) => {
    navigation.navigate("shop-active-orders-single", { orderId });
  };

  const handlePressOrderCollection = (orderCollectionId: string, orderId: string) => {
    navigation.navigate("shop-active-orders-single-collection", { orderCollectionId, orderId });
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
          <SingleShopOrder orderListItem={item} handlePress={handlePress} handlePressOrderCollection={handlePressOrderCollection} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AgentActiveOrders;
