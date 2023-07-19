import { AppBar, Button, Snackbar, Switch, Text, TextInput } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { Flex } from "react-native-flex-layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, SafeAreaView } from "react-native";
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
import { theme } from "../../../utils/theme";

type LoginProps = NativeStackScreenProps<IndexRouterList>;

const Login = (props: LoginProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isAgent, setIsAgent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loginFormik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // navigation.navigate("dashboard-shop");
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
      setErrorMsg((error.response?.data as any)?.message || "Error encountered");
      loginFormik.setSubmitting(false);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex fill={true} p={32} direction="column" justify="center" style={{ backgroundColor: theme.colors["dark-100"] }}>
        <Flex direction="row" justify="between">
          <Text color={theme.colors["dark-500"]} variant="h5" style={{ fontWeight: "600" }}>
            {isAgent ? "Agent Login" : "Shop Login"}
          </Text>
          <Switch
            thumbColor={theme.colors["dark-500"]}
            trackColor={{
              true: "#D5D5D5",
            }}
            value={isAgent}
            onValueChange={() => setIsAgent(!isAgent)}
          />
        </Flex>
        <TextInput
          value={loginFormik.values.email}
          variant="outlined"
          label="Email"
          color={theme.colors["dark-500"]}
          inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
          style={{ marginVertical: 16 }}
          onChangeText={loginFormik.handleChange("email")}
          onBlur={loginFormik.handleBlur("email")}
          helperText={loginFormik.errors.email && loginFormik.touched.email ? loginFormik.errors.email : ""}
        />
        <TextInput
          value={loginFormik.values.password}
          secureTextEntry
          variant="outlined"
          label="Password"
          color={theme.colors["dark-500"]}
          style={{ marginVertical: 16 }}
          inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
          onChangeText={loginFormik.handleChange("password")}
          onBlur={loginFormik.handleBlur("password")}
          helperText={loginFormik.errors.password && loginFormik.touched.password ? loginFormik.errors.password : ""}
        />
        <Button
          onPress={loginFormik.handleSubmit as any}
          loading={loginFormik.isSubmitting}
          color={theme.colors["dark-500"]}
          style={{ paddingVertical: 10 }}
          disabled={!isObjectEmpty(loginFormik.errors) || isObjectEmpty(loginFormik.touched)}
          title="Sign In"
        />
      </Flex>
      {errorMsg !== "" && (
        <Snackbar
          message={errorMsg}
          action={<Button variant="text" title="Dismiss" onPress={() => setErrorMsg("")} color={theme.colors["dark-100"]} compact />}
          style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Login;
