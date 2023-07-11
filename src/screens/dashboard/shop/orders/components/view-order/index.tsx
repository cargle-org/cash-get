import { AppBar, Box, Button, Flex, Icon, Text, TextInput } from "@react-native-material/core";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

const ViewSingleOrder = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <AppBar title="List Order" />
      <ScrollView style={{ padding: 16 }}>
        <Box mb={20}>
          <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Amount :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              Johnson Olaoluwa
            </Text>
          </Flex>
          <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Address :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              Johnson Olaoluwa
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
        <Box>
          <Text variant="h4" style={{ textAlign: "center" }}>
            Agent Details
          </Text>
          <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Name :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              Johnson Olaoluwa
            </Text>
          </Flex>
          <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Id :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              Johnson Olaoluwa
            </Text>
          </Flex>
          <Flex pv={8} justify="between" direction="row">
            <Text variant="caption" style={{ fontSize: 20 }}>
              Phone :
            </Text>
            <Text variant="button" style={{ fontSize: 20, fontWeight: "700" }}>
              Johnson Olaoluwa
            </Text>
          </Flex>
        </Box>
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
            <Text style={{ fontSize: 30, letterSpacing: 3, fontWeight: "600" }}>ABCDEFGHIJ</Text>
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
          <TextInput variant="outlined" />
          <Button title="Confirm Order" style={{ marginTop: 12, paddingVertical: 8 }} />
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewSingleOrder;
