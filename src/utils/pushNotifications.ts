import { isDevice } from "expo-device";
import { openSettings } from "expo-linking";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  AndroidImportance,
  getDevicePushTokenAsync,
  getExpoPushTokenAsync,
} from "expo-notifications";
import { Alert, Platform } from "react-native";
import Constants from "expo-constants";

const generatePushNotificationsToken = async (): Promise<string | undefined> => {
  let token;
  if (isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await getDevicePushTokenAsync();
    // token = await getExpoPushTokenAsync({
    //   projectId: Constants.expoConfig?.extra?.eas.projectId,
    // });
    console.log(token);
  } else {
    alert("Must use physical device for Push");
  }

  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token?.data;
};

export default generatePushNotificationsToken;
