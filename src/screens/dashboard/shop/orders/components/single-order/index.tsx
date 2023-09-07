import React, { useState } from "react";
import { theme } from "../../../../../../utils/theme";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Box, Divider, Flex, Icon, Text } from "@react-native-material/core";
import moment from "moment";
import { nairaCurrencyFormatter } from "../../../../../../utils/misc";
import { useQuery } from "react-query";
import { orderApi } from "../../../../../../services/order.service";
import { CollectionProgressStatusEnum, IOrderCollection, IOrderListItem } from "../../../../../../services/types";

const SingleShopOrder = (props: { orderListItem: IOrderListItem; handlePress: (orderCollectionId: string) => void }) => {
  const { orderListItem, handlePress } = props;
  const [showOrderCollections, setshowOrderCollections] = useState(false);
  const [orderId, setOrderId] = useState<string>();

  const handleShowOrderCollections = () => {
    if (!showOrderCollections) {
      setOrderId(orderListItem.id);
    }
    setshowOrderCollections(!showOrderCollections);
  };

  const { data, error, isFetching } = useQuery(["orders", orderListItem.id], () => orderApi.getSingleOrder(orderListItem.id), {
    enabled: !!orderId,
  });
  return (
    <View style={styles.orderSingleCardContainer}>
      <TouchableOpacity onPress={() => handleShowOrderCollections()}>
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
              <Text style={styles.orderSingleCardShopSectionAmount}>{nairaCurrencyFormatter(orderListItem.remainingAmount)}</Text>
              <Text style={styles.orderSingleCardShopSectionRemainingAmount}>({nairaCurrencyFormatter(orderListItem.amount)})</Text>
            </Flex>
          </View>
        </View>
      </TouchableOpacity>
      {showOrderCollections &&
        data?.data?.orderCollections.map((orderCollection) => (
          <View style={styles.orderSingleCardBodyContainer}>
            <Divider />
            <TouchableOpacity onPress={() => handlePress(orderCollection.id)}>
              <View style={styles.orderSingleCardShopSectionContainer}>
                <View style={styles.orderSingleCardShopSectionAvatarContainer}>
                  <Avatar size={40} image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
                  <Flex w={150}>
                    <Text style={styles.orderSingleCardAgentName}>Johnson Olaoluwa</Text>
                    <Text style={styles.orderSingleCardAgentNumber}>{"07053332295"}</Text>
                  </Flex>
                </View>
                <Flex items="end">
                  <View style={progressStyle(orderCollection.collectionProgressStatus).statusContainer}>
                    <Text style={progressStyle(orderCollection.collectionProgressStatus).statusText}>{orderCollection.collectionProgressStatus}</Text>
                  </View>
                  <Text style={styles.orderSingleCardShopAgentAmount}>{nairaCurrencyFormatter(orderCollection.amount)}</Text>
                </Flex>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
