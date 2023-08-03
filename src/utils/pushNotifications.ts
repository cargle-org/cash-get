import { isDevice } from "expo-device";
import { openSettings } from "expo-linking";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  setNotificationChannelAsync,
  AndroidImportance,
} from "expo-notifications";
import { Alert, Platform } from "react-native";
import Constants from "expo-constants";

const generatePushNotificationsToken = async (): Promise<string | undefined> => {
  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!isDevice) {
    throw new Error("Sorry, Push Notifications are only supported on physical devices.");
  }

  const { status: existingStatus } = await getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Error", "Sorry, we need your permission to enable Push Notifications. Please enable it in your privacy settings.", [
      {
        text: "OK",
      },
      {
        text: "Open Settings",
        onPress: async () => openSettings(),
      },
    ]);
    return undefined;
  }

  const token = await getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas.projectId,
  });

  return token.data;
};

export default generatePushNotificationsToken;
