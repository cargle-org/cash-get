import { AppBar, Button, IconButton, Pressable, Avatar } from "@react-native-material/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/authSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../../../utils/theme";
import { Icon } from "@react-native-material/core";
import { RootState } from "../../../store/appSlice";

interface IOrderAppBar {
  orderId?: string;
  navigate: NativeStackNavigationProp<any>;
}

const OrderAppBar: React.FC<IOrderAppBar> = (props) => {
  const { navigate, orderId } = props;
  const user = useSelector((state: RootState) => state.auth.user);

  const onClickClose = () => {
    navigate.goBack();
  };
  return (
    <AppBar
      title={`Order ID: ${orderId}`}
      titleStyle={{
        textTransform: "capitalize",
      }}
      color={theme.colors["white"]}
      tintColor={theme.colors["dark-200"]}
      style={{
        paddingHorizontal: 8,
      }}
      trailing={(appBarProps) => (
        <IconButton onPress={() => onClickClose()} icon={<Icon color={theme.colors["dark-200"]} name="close" size={26} />} />
      )}
    />
  );
};

export default OrderAppBar;
