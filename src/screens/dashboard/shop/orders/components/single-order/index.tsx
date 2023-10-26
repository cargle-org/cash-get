import React, { useState } from "react";
import { theme } from "../../../../../../utils/theme";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Box, Divider, Flex, Icon, Text } from "@react-native-material/core";
import moment from "moment";
import { nairaCurrencyFormatter } from "../../../../../../utils/misc";
import { useQuery } from "react-query";
import { orderApi } from "../../../../../../services/order.service";
import { CollectionProgressStatusEnum, IOrderCollection, IOrderListItem } from "../../../../../../services/types";

const SingleShopOrder = (props: {
  orderListItem: IOrderListItem;
  handlePress: (orderId: string) => void;
  handlePressOrderCollection: (orderCollectionId: string, orderId: string) => void;
}) => {
  const { orderListItem, handlePress, handlePressOrderCollection } = props;

  return (
    <View style={styles.orderSingleCardContainer}>
      <View style={styles.orderSingleCardheaderContainer}>
        <View style={statusStyle(orderListItem.status).statusContainer}>
          <Text style={statusStyle(orderListItem.status).statusText}>{orderListItem.status}</Text>
        </View>
        <View style={styles.orderSingleCardTimeContainer}>
          <Text style={styles.orderSingleCardTimeText}>{moment(orderListItem.deliveryPeriod).format("hh:mmA")}</Text>
        </View>
      </View>
      <View style={styles.orderSingleCardBodyContainer}>
        <View style={styles.orderSingleCardShopSectionContainer}>
          <View style={styles.orderSingleCardShopSectionAvatarContainer}>
            <Icon name="cart" size={40} />
            <Text style={styles.orderSingleCardShopSectionAvatarText}>{`#${orderListItem.id}`}</Text>
          </View>
          <Flex items="end">
            <Text style={styles.orderSingleCardShopSectionAmount}>{nairaCurrencyFormatter(orderListItem.amount)}</Text>
          </Flex>
        </View>
      </View>
      {orderListItem?.orderCollections?.map((orderCollection) => (
        <View style={styles.orderSingleCardBodyContainer}>
          <Divider />
          <TouchableOpacity onPress={() => handlePressOrderCollection(orderCollection.id, orderListItem.id)}>
            <View style={styles.orderSingleCardShopSectionContainer}>
              <View style={styles.orderSingleCardShopSectionAvatarContainer}>
                <Flex w={150}>
                  <Text style={styles.orderSingleCardAgentName}>{orderCollection.agentName}</Text>
                  <Text style={styles.orderSingleCardAgentNumber}>{orderCollection.agentNo}</Text>
                </Flex>
              </View>
              <Flex items="end">
                <Flex direction="row" items="center" mb={4}>
                  <Text style={styles.orderSingleCardShopAgentAmount}>{nairaCurrencyFormatter(orderCollection.amount)}</Text>
                  <Text style={styles.orderSingleCardAgentNumber}>({orderCollection.collectionStatus})</Text>
                </Flex>
                <View style={progressStyle(orderCollection.collectionProgressStatus).statusContainer}>
                  <Text style={progressStyle(orderCollection.collectionProgressStatus).statusText}>{orderCollection.collectionProgressStatus}</Text>
                </View>
              </Flex>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      <Divider />
      <TouchableOpacity onPress={() => handlePress(orderListItem.id)}>
        <View style={styles.orderSingleCardButtonView}>
          <Text style={styles.orderSingleCardButtonText}>View Order</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orderSingleCardContainer: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
    borderRadius: 12,
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
    // borderBottomRightRadius: 12,
    // borderBottomLeftRadius: 12,
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
  orderSingleCardShopAgentAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors["dark-400"],
  },
  orderSingleCardAgentName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors["dark-400"],
    marginBottom: 4,
  },
  orderSingleCardAgentNumber: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors["dark-200"],
  },
  orderSingleCardShopSectionRemainingAmount: {
    fontSize: 12,
    fontWeight: "400",
    color: theme.colors["dark-300"],
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
  orderSingleCardButtonView: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 12,
    backgroundColor: theme.colors.white,
    // borderTopWidth: 2,
    // borderTopColor: theme.colors["dark-100"],
  },
  orderSingleCardButtonText: {
    color: theme.colors["dark-500"],
    fontSize: 16,
    fontWeight: "700",
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

const progressStyle = (status: CollectionProgressStatusEnum) =>
  StyleSheet.create({
    statusContainer: {
      backgroundColor: status === CollectionProgressStatusEnum.STARTED ? "blue" : "green",
      padding: 4,
      borderRadius: 4,
    },
    statusText: {
      color: theme.colors.white,
      fontSize: 8,
      fontWeight: "600",
    },
  });
export default SingleShopOrder;
