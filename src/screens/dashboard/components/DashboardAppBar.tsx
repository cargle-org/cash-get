import { AppBar, Button, IconButton, Pressable, Avatar } from "@react-native-material/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/authSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../../../utils/theme";
import { Icon } from "@react-native-material/core";
import { RootState } from "../../../store/appSlice";

interface IDashboardAppBar {
  title?: string;
  navigate: any;
}

const DashboardAppBar: React.FC<IDashboardAppBar> = (props) => {
  const { navigate } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
    navigate.navigate("auth");
  };
  return (
    <AppBar
      title={user?.name}
      titleStyle={{
        textTransform: "capitalize",
      }}
      color={theme.colors["white"]}
      tintColor={theme.colors["dark-500"]}
      style={{
        paddingTop: 40,
        paddingHorizontal: 8,
      }}
      trailing={(appBarProps) => (
        <IconButton onPress={() => onClickLogout()} icon={() => <Icon color={theme.colors["dark-500"]} name="logout" size={26} />} />
      )}
      leading={(appBarProps) => <Icon color={theme.colors["dark-500"]} name="store" size={26} />}
    />
  );
};

export default DashboardAppBar;
