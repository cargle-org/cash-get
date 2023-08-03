import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Main from "./src/Main";
import "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

export default function App() {
  const [fontLoaded] = useFonts({});

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return <Main />;
}
