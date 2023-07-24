import { Avatar, Flex, Icon, Pressable, Text } from "@react-native-material/core";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { nairaCurrencyFormatter } from "../../../../../../utils/misc";
import { Divider } from "react-native-paper";
import { theme } from "../../../../../../utils/theme";
import moment from "moment";

const SingleOrder = ({ orderId, amount, status, agentName, agentId, agentNo, onPress, time }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.orderSingleCardContainer}>
        <View style={styles.orderSingleCardheaderContainer}>
          <View style={statusStyle(status).statusContainer}>
            <Text style={statusStyle(status).statusText}>{status}</Text>
          </View>
          <View style={styles.orderSingleCardTimeContainer}>
            <Text style={styles.orderSingleCardTimeText}>{moment(time).format("hh:mmA")}</Text>
          </View>
        </View>
        <View style={styles.orderSingleCardBodyContainer}>
          <View style={styles.orderSingleCardShopSectionContainer}>
            <View style={styles.orderSingleCardShopSectionAvatarContainer}>
              <Icon name="cart" size={40} />
              <Text style={styles.orderSingleCardShopSectionAvatarText}>{`#${orderId}`}</Text>
            </View>
            <Text style={styles.orderSingleCardShopSectionAmount}>{nairaCurrencyFormatter(amount)}</Text>
          </View>
          {agentId && (
            <>
              <Divider />
              <View style={styles.orderSingleCardAgentSectionContainer}>
                <View style={styles.orderSingleCardAgentSectionItemContainer}>
                  <Text style={styles.orderSingleCardAgentSectionLabel}>Agent Name</Text>
                  <Text style={styles.orderSingleCardAgentSectionText}>{agentName}</Text>
                </View>
                <View style={styles.orderSingleCardAgentSectionItemContainer}>
                  <Text style={styles.orderSingleCardAgentSectionLabel}>Agent Number</Text>
                  <Text style={styles.orderSingleCardAgentSectionText}>{agentNo}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
      <View></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderSingleCardContainer: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  orderSingleCardheaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: theme.colors["dark-500"],
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  orderSingleCardTimeContainer: {
    backgroundColor: theme.colors["dark-400"],
    padding: 8,
    borderRadius: 8,
  },
  orderSingleCardTimeText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  orderSingleCardBodyContainer: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: theme.colors.white,
  },
  orderSingleCardShopSectionContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderSingleCardShopSectionAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  orderSingleCardShopSectionAvatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors["dark-400"],
    maxWidth: 100,
  },
  orderSingleCardShopSectionAmount: {
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors["dark-400"],
  },
  orderSingleCardAgentSectionContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderSingleCardAgentSectionItemContainer: {},
  orderSingleCardAgentSectionLabel: {
    fontSize: 16,
    color: theme.colors["dark-200"],
  },
  orderSingleCardAgentSectionText: {
    fontSize: 16,
    color: theme.colors["dark-400"],
    fontWeight: "600",
  },
});

const statusStyle = (status: string) =>
  StyleSheet.create({
    statusContainer: {
      backgroundColor: "blue",
      padding: 8,
      borderRadius: 8,
    },
    statusText: {
      color: theme.colors.white,
      fontSize: 12,
      fontWeight: "600",
    },
  });

export default SingleOrder;
