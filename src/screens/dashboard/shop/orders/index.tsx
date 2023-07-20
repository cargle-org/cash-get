import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, StatusBar, View } from "react-native";
import SingleOrder from "./components/single-order";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/appSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DashboardShopOrdersRootList } from "./root";
import { IOrderListItem } from "../../../../services/types";
import DashboardAppBar from "../../components/DashboardAppBar";
import { theme } from "../../../../utils/theme";

const Orders = ({ navigation }: NativeStackScreenProps<DashboardShopOrdersRootList>) => {
  const orders = useSelector((state: RootState) => state.order.openOrders);
  const handlePress = (item: IOrderListItem) => {
    // Handle press event for a list item
    navigation.navigate("shop-orders-single", { orderId: item.id });
  };
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: theme.colors["dark-100"] }}>
      <DashboardAppBar navigate={navigation} />
      <FlatList
        style={{ paddingVertical: 32, paddingHorizontal: 16 }}
        contentContainerStyle={{
          display: "flex",
          gap: 12,
        }}
        data={orders}
        renderItem={({ item }) => (
          <SingleOrder
            orderId={item.id}
            amount={item.amount}
            status={item.status}
            time={item.deliveryPeriod}
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

export default Orders;
