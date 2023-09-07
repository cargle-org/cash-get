import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/appSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IOrderCollectionListItem, IOrderListItem } from "../../../../services/types";
import { DashboardAgentRootList } from "../root";
import SingleOrder from "../components/single-order";
import { SettledOrdersRootList } from "./root";
import DashboardAppBar from "../../components/DashboardAppBar";
import { theme } from "../../../../utils/theme";
import AgentSingleOrderCollection from "../components/single-order-collection";

const AgentSettledOrders = ({ navigation }: NativeStackScreenProps<SettledOrdersRootList>) => {
  const orderCollections = useSelector((state: RootState) => state.orderCollection.closedOrderCollections);
  const handlePress = (item: IOrderCollectionListItem) => {
    // Handle press event for a list item
    navigation.navigate("agent-settled-orders-single", { orderCollectionId: item.id });
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: theme.colors["dark-100"], paddingVertical: 32, paddingHorizontal: 16 }}
        contentContainerStyle={{
          display: "flex",
          gap: 12,
        }}
        data={orderCollections}
        renderItem={({ item }) => (
          <AgentSingleOrderCollection
            orderId={item.id}
            time={item.deliveryPeriod}
            amount={item.amount}
            status={item.collectionProgressStatus}
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
