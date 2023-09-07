import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SingleOpenOrder from "../components/single-open-order";
import { ActiveOrdersRootList } from "./root";
import { RootState } from "../../../../../store/appSlice";
import { IOrderListItem } from "../../../../../services/types";
import { theme } from "../../../../../utils/theme";
import SingleShopOrder from "../components/single-order";

const AgentActiveOrders = ({ navigation }: NativeStackScreenProps<ActiveOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.shopOrders.activeOrders);
  const handlePress = (orderCollectionId: string) => {
    navigation.navigate("shop-active-orders-single", { orderCollectionId });
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <DashboardAppBar navigate={navigation} /> */}
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

export default AgentActiveOrders;
