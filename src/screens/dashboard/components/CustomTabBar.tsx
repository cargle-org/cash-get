import React from "react";
import { Animated, View, TouchableOpacity } from "react-native";
import DashboardAppBar from "./DashboardAppBar";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Box, Flex, Icon, IconButton, Text } from "@react-native-material/core";
import { theme } from "../../../utils/theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/appSlice";
import { logout } from "../../../store/authSlice";

const CustomTabBar = ({ state, descriptors, navigation, position }: MaterialTopTabBarProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
    navigation.navigate("auth");
  };
  return (
    <View
      style={{
        paddingTop: 40,
        backgroundColor: theme.colors.white,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 1,
        zIndex: 2,
      }}
    >
      <Flex ph={12} justify="between" direction="row">
        <Flex direction="row" items="center">
          <Icon color={theme.colors["dark-500"]} name="store" size={26} />
          <Text style={{ fontWeight: "500", fontSize: 20, marginLeft: 20 }}>{user?.name}</Text>
        </Flex>
        <IconButton onPress={onClickLogout} icon={<Icon color={theme.colors["dark-500"]} name="logout" size={26} />} />
      </Flex>
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name, { merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_: any, i: any) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              key={state.index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: "center",
                paddingVertical: 8,
                borderBottomColor: isFocused ? theme.colors["dark-500"] : theme.colors.white,
                borderBottomWidth: 2,
              }}
            >
              <Animated.Text
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  color: isFocused ? theme.colors["dark-500"] : theme.colors["dark-200"],
                }}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
