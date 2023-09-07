import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettledOrdersRootList } from "./root";
import { RootState } from "../../../../../store/appSlice";
import { theme } from "../../../../../utils/theme";
import SingleShopOrder from "../components/single-order";

const AgentSettledOrders = ({ navigation }: NativeStackScreenProps<SettledOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.shopOrders.closedOrders);
  const handlePress = (orderCollectionId: string) => {
    // Handle press event for a list item
    navigation.navigate("shop-settled-orders-single", { orderCollectionId });
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
        renderItem={({ item }) => <SingleShopOrder orderListItem={item} handlePress={handlePress} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AgentSettledOrders;
