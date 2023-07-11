import React, { useEffect, useRef } from "react";
import { Animated, Easing, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import Lottie from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ProfileProps = NativeStackScreenProps<any>;

const LandingPage = (props: ProfileProps) => {
  const { navigation } = props;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("auth", { screen: "login" });
    }, 5000);
  }, []);
  return (
    <Flex fill={true} p={32} direction="column" justify="center" style={{ backgroundColor: "#ffffff" }}>
      <Lottie source={{ uri: "https://assets9.lottiefiles.com/packages/lf20_f1dhzsnx.json" }} autoPlay loop />
    </Flex>
  );
};

export default LandingPage;
