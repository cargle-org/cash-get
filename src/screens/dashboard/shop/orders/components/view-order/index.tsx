import { AppBar, Avatar, Box, Button, Divider, Flex, Icon, IconButton, Pressable, Snackbar, Text, TextInput } from "@react-native-material/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Clipboard, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { DashboardShopOrdersRootList } from "../../root";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { orderApi } from "../../../../../../services/order.service";
import { nairaCurrencyFormatter } from "../../../../../../utils/misc";
import { IUser } from "../../../../../../services/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/appSlice";
import { AxiosError } from "axios";
import { theme } from "../../../../../../utils/theme";
import DashboardAppBar from "../../../../components/DashboardAppBar";
import OrderAppBar from "../../../../components/OrderAppBar";
import moment from "moment";
// import Clipboard from "@react-native-clipboard/clipboard";

const ViewSingleOrder = (props: NativeStackScreenProps<DashboardShopOrdersRootList>) => {
  const { route, navigation } = props;
  const [agentKey, setAgentKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const queryClient = useQueryClient();
  const orderId = (route.params as any)?.orderId;
  const mutation = useMutation({
    mutationFn: orderApi.confirmAgentKey,
    onSuccess: ({ message, status, data }) => {
      queryClient.invalidateQueries(orderId);
      setSuccessMsg(message);
      queryClient.invalidateQueries(["orders", orderId]);
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

  const deleteMutation = useMutation({
    mutationFn: orderApi.deleteOrder,
    onSuccess: ({ message, status, data }) => {
      queryClient.invalidateQueries(orderId);
      setSuccessMsg(message);
      queryClient.invalidateQueries(["orders", orderId]);
      setTimeout(() => {
        setSuccessMsg("");
        navigation.goBack();
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

  const confirmOrder = (key: string) => {
    mutation.mutate({
      orderId: orderId,
      agentKey: key,
    });
  };

  const deleteOrder = () => {
    deleteMutation.mutate({ orderId });
  };
  const { data, error, isFetching } = useQuery(["orders", orderId], () => orderApi.getSingleOrder(orderId));
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
            {data?.data?.agent && (
              <>
                <Divider />
                <View style={styles.orderCardAgentSectionContainer}>
                  <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
                  <View style={styles.orderCardAgentSectionContainer2}>
                    <Text style={styles.orderCardAgentName}>{(data.data.agent as IUser).name}</Text>
                    <Text style={styles.orderCardAgentPhoneNo}>{(data.data.agent as IUser).phoneNo}</Text>
                  </View>
                </View>
              </>
            )}
            <Divider />
            <View style={styles.orderCardTimeContainer}>
              <Text style={styles.orderCardTimeText1}>Scheduled for</Text>
              <Text style={styles.orderCardTimeText2}>{moment(data?.data?.deliveryPeriod).format("hh:mm D-m-YY")}</Text>
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
          <View style={styles.orderCardCopyApiKeyContainer}>
            <Text style={styles.orderCardCopyApiKeyTitle}>Shop Key</Text>
            <View style={styles.orderCardCopyApiKeyPressable}>
              <Text variant="overline" style={styles.orderCardCopyApiKeyText}>
                {data?.data?.shopKey}
              </Text>
              <TouchableOpacity onPress={() => Clipboard.setString(data?.data?.shopKey || "")}>
                <Icon name="content-copy" color={theme.colors.white} size={26} />
              </TouchableOpacity>
            </View>
          </View>
          <Divider />
          <View style={styles.orderCardSubmitAgentKeyContainer}>
            <TextInput
              variant="outlined"
              label="Agent API Key"
              onChangeText={setAgentKey}
              value={agentKey}
              color={theme.colors["dark-500"]}
              inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
              style={{ marginBottom: 16 }}
              editable={!data?.data?.agentConfirmed}
            />
            <Button
              disabled={data?.data?.agentConfirmed || agentKey.length < 12}
              onPress={() => confirmOrder(agentKey)}
              color={theme.colors["dark-500"]}
              style={{ paddingVertical: 10 }}
              title="Submit Key"
            />
          </View>
          <Divider />
          <View style={styles.orderCardSubmitAgentKeyContainer}>
            <Button onPress={() => deleteOrder()} color={"red"} tintColor="white" style={{ paddingVertical: 10 }} title="Cancel Order" />
          </View>
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
    marginBottom: 12,
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
});

export default ViewSingleOrder;
