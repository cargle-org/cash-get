import { AppBar, Text } from "@react-native-material/core";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import SingleOrder from "./components/single-order";

const Orders = ({ navigation }: any) => {
  const data = [
    { id: 1, amount: "#1,200,000", status: "Very Important", agentName: "Olaoluwa Johnson", agentId: "123", agentNo: "+234-7053332295" },
    { id: 2, amount: "200,000", status: "Important", agentName: "Jane Smith", agentId: "456", agentNo: "555-5678" },
    { id: 3, amount: "Item 3", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 4, amount: "Item 4", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 5, amount: "Item 5", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 6, amount: "Item 6", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 7, amount: "Item 7", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 8, amount: "Item 8", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 9, amount: "Item 9", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 10, amount: "Item 10", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 11, amount: "Item 11", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 12, amount: "Item 12", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    { id: 13, amount: "Item 13", status: "Important", agentName: "Bob Johnson", agentId: "789", agentNo: "555-9876" },
    // Add more items as needed
  ] as const;

  const handlePress = (item: any) => {
    // Handle press event for a list item
    navigation.navigate("shop-orders-single");
    console.log(item.amount);
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <AppBar title="List Order" />
      <FlatList
        style={{ backgroundColor: "#ffffff", paddingVertical: 32, paddingHorizontal: 16 }}
        contentContainerStyle={{
          display: "flex",
          gap: 12,
        }}
        data={data}
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
    </SafeAreaView>
  );
};

export default Orders;
