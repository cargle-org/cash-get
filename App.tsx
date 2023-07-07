import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Main from "./src/Main";

export default function App() {
  const [fontLoaded] = useFonts({});

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return <Main />;
}
