import { AppBar, Button, Pressable } from "@react-native-material/core";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IDashboardAppBar {
  title: string;
  navigate: NativeStackNavigationProp<any>;
}

const DashboardAppBar: React.FC<IDashboardAppBar> = (props) => {
  const { title, navigate } = props;
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
    navigate.navigate("auth");
  };
  return (
    <AppBar
      title={title}
      trailing={(appBarProps) => <Button onPress={() => onClickLogout()} color="#ffffff" variant="text" title="Logout" compact />}
    />
  );
};

export default DashboardAppBar;
