import { Button, Switch, Text, TextInput } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { Flex } from "react-native-flex-layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { authApi } from "../../../services/auth.service";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { loginValidationSchema } from "./validation";
import { isObjectEmpty } from "../../../utils/misc";
import { UserEnum } from "../../../services/types";
import { login } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { IndexRouterList } from "../../../router/index.router";

type LoginProps = NativeStackScreenProps<IndexRouterList>;

const Login = (props: LoginProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isAgent, setIsAgent] = useState(false);

  const loginFormik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutation.mutate({ ...values, role: isAgent ? UserEnum.AGENT : UserEnum.SHOP });
    },
  });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ message, data }) => {
      loginFormik.setSubmitting(false);
      dispatch(
        login({
          accessToken: data!.accessToken,
          user: data!.user,
        })
      );
      if (data?.user.role === UserEnum.AGENT) {
        navigation.navigate("dashboard-agent");
      } else {
        navigation.navigate("dashboard-shop");
      }
    },
    onError: (error: AxiosError) => {
      console.error(error.response?.data);
      loginFormik.setSubmitting(false);
    },
  });
  return (
    <Flex fill={true} p={32} direction="column" justify="center" style={{ backgroundColor: "#ffffff" }}>
      {/* <Flex direction="row" justify="between">
        <Text variant="h5" style={{ fontWeight: "600" }}>
          {isAgent ? "Agent Login" : "Shop Login"}
        </Text>
        <Switch value={isAgent} onValueChange={() => setIsAgent(!isAgent)} />
      </Flex> */}
      <TextInput
        value={loginFormik.values.email}
        variant="standard"
        label="Email"
        style={{ marginVertical: 16 }}
        onChangeText={loginFormik.handleChange("email")}
        onBlur={loginFormik.handleBlur("email")}
        helperText={loginFormik.errors.email && loginFormik.touched.email ? loginFormik.errors.email : ""}
      />
      <TextInput
        value={loginFormik.values.password}
        secureTextEntry
        variant="standard"
        label="Password"
        style={{ marginVertical: 16 }}
        onChangeText={loginFormik.handleChange("password")}
        onBlur={loginFormik.handleBlur("password")}
        helperText={loginFormik.errors.password && loginFormik.touched.password ? loginFormik.errors.password : ""}
      />
      <Button
        onPress={loginFormik.handleSubmit as any}
        loading={loginFormik.isSubmitting}
        disabled={!isObjectEmpty(loginFormik.errors) || isObjectEmpty(loginFormik.touched)}
        title="Sign In"
      />
    </Flex>
  );
};

export default Login;
