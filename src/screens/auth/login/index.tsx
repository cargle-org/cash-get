import { Button, TextInput } from "@react-native-material/core";
import React, { useEffect, useMemo, useState } from "react";
import { Flex } from "react-native-flex-layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert } from "react-native";

type LoginProps = NativeStackScreenProps<any>;

const Login = (props: LoginProps) => {
  const { navigation } = props;
  //Replace login with formik
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const allowLogin = useMemo(() => {
    return loginData.email !== "" && loginData.password !== "";
  }, [loginData]);

  const onClickLogin = () => {
    navigation.navigate("dashboard");
  };
  return (
    <Flex fill={true} p={32} direction="column" justify="center" style={{ backgroundColor: "#ffffff" }}>
      <TextInput
        value={loginData.email}
        variant="standard"
        label="Email"
        style={{ marginVertical: 16 }}
        onChangeText={(text) => setLoginData({ ...loginData, email: text })}
      />
      <TextInput
        value={loginData.password}
        secureTextEntry
        variant="standard"
        label="Password"
        style={{ marginVertical: 16 }}
        onChangeText={(text) => setLoginData({ ...loginData, password: text })}
      />
      <Button onPress={() => onClickLogin()} disabled={!allowLogin} title="Sign In" />
    </Flex>
  );
};

export default Login;
