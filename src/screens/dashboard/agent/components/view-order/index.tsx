import { AppBar, Box, Button, Flex, Icon, Text, TextInput } from "@react-native-material/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { DashboardAgentRootList } from "../../root";
import { orderApi } from "../../../../../services/order.service";
import { IUser } from "../../../../../services/types";
import { nairaCurrencyFormatter } from "../../../../../utils/misc";

const ViewSingleOrder = (props: NativeStackScreenProps<DashboardAgentRootList>) => {
  const { route } = props;
  const [agentKey, setAgentKey] = useState("");
  const queryClient = useQueryClient();
  const orderId = (route.params as any)?.orderId;
  const mutation = useMutation({
    mutationFn: orderApi.confirmAgentKey,
    onSuccess: ({ message, status, data }) => {
      queryClient.invalidateQueries(orderId);
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);
    },
  });

  const confirmOrder = (key: string) => {
    mutation.mutate({
      orderId: orderId,
      agentKey: key,
    });
  };
  const { data, isSuccess, error } = useQuery(["orders", orderId], () => orderApi.getSingleOrder(orderId));
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <AppBar title={`Order ID: ${orderId}`} />

      <ScrollView style={{ padding: 16 }}>
        <Box mb={20}>
          <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Amount :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              {nairaCurrencyFormatter(data?.data?.amount || 0)}
            </Text>
          </Flex>
          <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Address :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              {data?.data?.address}
            </Text>
          </Flex>
          {/* <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Request ID :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              Johnson Olaoluwa
            </Text>
          </Flex> */}
        </Box>
        {data?.data?.agent && (
          <Box>
            <Text variant="h4" style={{ textAlign: "center" }}>
              Agent Details
            </Text>
            <Flex pv={8} justify="between" direction="row">
              <Text variant="caption" style={{ fontSize: 20 }}>
                Name :
              </Text>
              <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
                {(data?.data?.agent as IUser)?.name}
              </Text>
            </Flex>
            <Flex pv={8} justify="between" direction="row">
              <Text variant="caption" style={{ fontSize: 20 }}>
                Id :
              </Text>
              <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
                {(data?.data?.agent as IUser)?.id}
              </Text>
            </Flex>
            <Flex pv={8} justify="between" direction="row">
              <Text variant="caption" style={{ fontSize: 20 }}>
                Phone :
              </Text>
              <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
                {(data?.data?.agent as IUser)?.phoneNo}
              </Text>
            </Flex>
          </Box>
        )}

        <Box
          style={{
            marginTop: 40,
          }}
        >
          <Text variant="h4" style={{ textAlign: "center" }}>
            Ticket Shop Key
          </Text>
          <TouchableOpacity
            style={{
              height: 80,
              marginTop: 20,
              backgroundColor: "grey",
              borderRadius: 12,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 32, letterSpacing: 3, fontWeight: "600" }}>{data?.data?.shopKey}</Text>
            <Icon name="content-copy" size={26} />
          </TouchableOpacity>
        </Box>
        <Flex
          style={{
            marginTop: 40,
            gap: 8,
          }}
        >
          <Text variant="h4" style={{ textAlign: "center" }}>
            Enter Agent Key
          </Text>
          <TextInput value={agentKey} onChangeText={setAgentKey} variant="outlined" />
          <Button onPress={() => confirmOrder(agentKey)} title="Confirm Order" style={{ marginTop: 12, paddingVertical: 8 }} />
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewSingleOrder;
