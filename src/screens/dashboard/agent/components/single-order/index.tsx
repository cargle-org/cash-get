import { Flex, Pressable, Text } from "@react-native-material/core";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { nairaCurrencyFormatter } from "../../../../../utils/misc";

const SingleOrder = ({ amount, status, agentName, agentId, agentNo, onPress }: any) => {
  return (
    <TouchableOpacity style={styles().container} onPress={onPress}>
      <View>
        <Text style={styles().amount}>{nairaCurrencyFormatter(amount)}</Text>
        <Text style={styles(status).status}>{status}</Text>
      </View>
      <View style={styles().agentView}>
        <Text style={styles().agent}>{agentName}</Text>
        <Text style={styles().agentId}>{agentId}</Text>
        <Text style={styles().agent}>{agentNo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (status?: string) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      marginBottom: 8,
    },
    amount: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    status: {
      fontSize: 14,
      color: status === "Important" ? "green" : "blue",
    },
    agentView: {
      alignItems: "flex-end",
    },
    agent: {
      fontSize: 16,
    },
    agentId: {
      fontSize: 12,
      color: "#888",
      marginBottom: 8,
    },
  });

export default SingleOrder;
