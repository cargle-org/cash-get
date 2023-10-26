import { AppBar, Avatar, Box, Button, Divider, Flex, Icon, IconButton, Pressable, Snackbar, Text, TextInput } from "@react-native-material/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Clipboard, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";
import moment from "moment";

import { ActiveOrdersRootList } from "../root";
import { orderApi } from "../../../../../../services/order.service";
import { theme } from "../../../../../../utils/theme";
import OrderAppBar from "../../../../components/OrderAppBar";
import { nairaCurrencyFormatter } from "../../../../../../utils/misc";
import { CollectionProgressStatusEnum, IUser } from "../../../../../../services/types";
// import Clipboard from "@react-native-clipboard/clipboard";

const ViewOpenOrdersSingleOrder = (props: NativeStackScreenProps<ActiveOrdersRootList>) => {
  const { route, navigation } = props;
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const queryClient = useQueryClient();
  const orderId = (route.params as any)?.orderId;
  const mutation = useMutation({
    mutationFn: orderApi.confirmAgentKey,
    onSuccess: ({ message, status, data }) => {
      queryClient.invalidateQueries(orderId);
      setSuccessMsg(message);
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);
      setErrorMsg((error.response?.data as any).message || "Error Encountered");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    },
  });

  const { data, error, isFetching } = useQuery(["orders", orderId], () => orderApi.getSingleOrder(orderId));
  // console.log(data);
  // useEffect(() => {
  //   queryClient.invalidateQueries([orderId]);
  //   console.log(data);
  // }, [data]);

  const handlePressOrderCollection = (orderCollectionId: string, orderId: string) => {
    navigation.navigate("shop-active-orders-single-collection", { orderCollectionId, orderId });
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors["dark-100"] }}>
      <OrderAppBar navigate={navigation} orderId={orderId} />
      {isFetching ? (
        <Text>Loading ...</Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{ padding: 16 }}>
          <View style={styles.orderCardContainer}>
            <View style={styles.orderCardIconContainer}>
              <Icon name="store" color={theme.colors["dark-100"]} size={50} />
            </View>
            <View style={styles.orderPrimaryDetailsContainer}>
              <Text style={styles.orderCardAmount}>{nairaCurrencyFormatter(data?.data?.amount || 0)}</Text>
              <Text style={styles.orderCardAddress}>{data?.data?.address}</Text>
            </View>
            {data?.data?.shop && (
              <>
                <Divider />
                <View style={styles.orderCardAgentSectionContainer}>
                  <Avatar />
                  <View style={styles.orderCardAgentSectionContainer2}>
                    <Text style={styles.orderCardAgentName}>{(data.data.shop as IUser).name}</Text>
                    <Text style={styles.orderCardAgentPhoneNo}>{(data.data.shop as IUser).phoneNo}</Text>
                  </View>
                </View>
              </>
            )}
            <Divider />
            <View style={styles.orderCardTimeContainer}>
              <Text style={styles.orderCardTimeText1}>Pick up before</Text>
              <Text style={styles.orderCardTimeText2}>{moment(data?.data?.deliveryPeriod).format("hh:mmA D-m-YY")}</Text>
            </View>
            <Divider />
            <View style={styles.orderCardItemsContainer}>
              <View style={styles.orderCardItemsItem}>
                <Text style={styles.orderCardItemsText1}>Contact Name :</Text>
                <Text style={styles.orderCardItemsText2}>{data?.data?.contactName}</Text>
              </View>
              <View style={styles.orderCardItemsItem}>
                <Text style={styles.orderCardItemsText1}>Contact No:</Text>
                <Text style={styles.orderCardItemsText2}>{data?.data?.contactNumber}</Text>
              </View>
              <View style={{ ...styles.orderCardItemsItem, flexDirection: "column" }}>
                <Text style={styles.orderCardItemsText1}>Extra Info:</Text>
                {data?.data?.extraInfo && <Text style={styles.orderCardItemsText2}>{data?.data?.extraInfo}</Text>}
              </View>
            </View>
          </View>
          <Divider />
          {(data?.data?.orderCollections?.length || data!.data!.orderCollections.length > 0) && (
            <Text style={styles.orderCardCopyApiKeyTitle}>Order Collections</Text>
          )}

          {data?.data?.orderCollections?.map((orderCollection) => (
            <View style={styles.orderSingleCardBodyContainer}>
              <TouchableOpacity onPress={() => handlePressOrderCollection(orderCollection.id, data.data!.id)}>
                <View style={styles.orderSingleCardShopSectionContainer}>
                  <View style={styles.orderSingleCardShopSectionAvatarContainer}>
                    <Flex w={150}>
                      <Text style={styles.orderSingleCardAgentName}>{orderCollection.agent.name}</Text>
                      <Text style={styles.orderSingleCardAgentNumber}>{orderCollection.agent.phoneNo}</Text>
                    </Flex>
                  </View>
                  <Flex items="end">
                    <Flex direction="row" items="center" mb={4}>
                      <Text style={styles.orderSingleCardShopAgentAmount}>{nairaCurrencyFormatter(orderCollection.amount)}</Text>
                      <Text style={styles.orderSingleCardAgentNumber}>({orderCollection.collectionStatus})</Text>
                    </Flex>
                    <View style={progressStyle(orderCollection.collectionProgressStatus).statusContainer}>
                      <Text style={progressStyle(orderCollection.collectionProgressStatus).statusText}>
                        {orderCollection.collectionProgressStatus}
                      </Text>
                    </View>
                  </Flex>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      {errorMsg !== "" && (
        <Snackbar
          message={errorMsg}
          action={<Button variant="text" title="Dismiss" onPress={() => setErrorMsg("")} color={theme.colors["dark-100"]} compact />}
          style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
        />
      )}

      {successMsg !== "" && (
        <Snackbar
          message={successMsg}
          action={
            <Button
              variant="text"
              title="Dismiss"
              onPress={() => {
                setSuccessMsg("");
                navigation.goBack();
              }}
              color={theme.colors["dark-100"]}
              compact
            />
          }
          style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderCardContainer: {
    marginTop: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: "relative",
    marginBottom: 32,
  },
  orderCardIconContainer: {
    display: "flex",
    position: "absolute",
    height: 80,
    width: 80,
    backgroundColor: theme.colors["dark-400"],
    left: 130,
    transform: [{ translateY: -40 }],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  orderPrimaryDetailsContainer: {
    marginTop: 40,
    padding: 28,
    flexDirection: "column",
    alignItems: "center",
  },
  orderCardAmount: {
    fontSize: 36,
    fontWeight: "500",
    color: theme.colors["dark-400"],
  },
  orderCardAddress: {
    fontSize: 24,
    color: theme.colors["dark-200"],
  },
  orderCardAgentSectionContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 16,
  },
  orderCardAgentSectionContainer2: {
    gap: 4,
  },
  orderCardAgentName: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors["dark-400"],
  },
  orderCardAgentPhoneNo: {
    fontSize: 16,
    color: theme.colors["dark-200"],
  },
  orderCardTimeContainer: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
  },
  orderCardTimeText1: {
    fontSize: 16,
    color: theme.colors["dark-200"],
  },
  orderCardTimeText2: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors["dark-400"],
  },
  orderCardItemsContainer: {
    padding: 16,
    gap: 12,
  },
  orderCardItemsItem: {
    flexDirection: "row",
    gap: 12,
  },
  orderCardItemsText1: {
    fontSize: 16,
    color: theme.colors["dark-200"],
  },
  orderCardItemsText2: {
    fontSize: 16,
    color: theme.colors["dark-400"],
    fontWeight: "600",
  },
  orderCardCopyApiKeyContainer: {
    paddingVertical: 16,
  },
  orderCardCopyApiKeyTitle: {
    marginVertical: 12,
    fontWeight: "600",
    fontSize: 16,
    color: theme.colors["dark-200"],
    textAlign: "center",
  },
  orderCardCopyApiKeyPressable: {
    flexDirection: "row",
    height: 60,
    borderRadius: 12,
    backgroundColor: theme.colors["dark-500"],
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  orderCardCopyApiKeyText: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors["white"],
  },
  orderCardSubmitAgentKeyContainer: {
    paddingVertical: 16,
  },
  //copied
  orderSingleCardBodyContainer: {
    backgroundColor: theme.colors.white,
    marginBottom: 8,
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
  orderSingleCardShopAgentAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors["dark-400"],
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

export default ViewOpenOrdersSingleOrder;
