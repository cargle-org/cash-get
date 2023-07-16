import React, { useEffect, useRef } from "react";
import { Animated, Easing, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "@react-native-material/core";
import { Flex } from "react-native-flex-layout";
import Lottie from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/appSlice";
import { isAuthenticated } from "../../../utils/misc";
import { UserEnum } from "../../../services/types";

type ProfileProps = NativeStackScreenProps<any>;

const LandingPage = (props: ProfileProps) => {
  const { navigation } = props;
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated(accessToken)) {
        if (user?.role === UserEnum.AGENT) {
          navigation.navigate("dashboard-agent");
        } else {
          navigation.navigate("dashboard-shop");
        }
      } else {
        navigation.navigate("auth", { screen: "login" });
      }
    }, 5000);
  }, []);
  return (
    <Flex fill={true} p={32} direction="column" justify="center" style={{ backgroundColor: "#ffffff" }}>
      <Lottie source={{ uri: "https://assets9.lottiefiles.com/packages/lf20_f1dhzsnx.json" }} autoPlay loop />
    </Flex>
  );
};

export default LandingPage;
