import { AppBar, Box, Button, Flex, Text, TextInput } from "@react-native-material/core";
import { useFormik } from "formik";
import React from "react";
import { SafeAreaView, TextInput as DefaultTextInput, View, ScrollView, StatusBar } from "react-native";
import { createOrderValidationSchema } from "./validation";
import { isObjectEmpty } from "../../../../utils/misc";
import DashboardAppBar from "../../components/DashboardAppBar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "react-query";
import { orderApi } from "../../../../services/order.service";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/appSlice";

type CreateOrderProps = NativeStackScreenProps<any>;

const CreateOrder = (props: CreateOrderProps) => {
  const { navigation } = props;
  const shop = useSelector((state: RootState) => state.auth.user);
  const mutation = useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: ({ data, message, status }) => {
      createOrderFormik.setSubmitting(false);
    },
    onError: (error: AxiosError) => {
      createOrderFormik.setSubmitting(false);
    },
  });
  const createOrderFormik = useFormik({
    validationSchema: createOrderValidationSchema,
    initialValues: {
      amount: "",
      address: "",
      contactName: "",
      contactNumber: "",
      extraInfo: "",
    },
    onSubmit: (values) => {
      mutation.mutate({ shopId: shop?.id || "", body: { ...values, amount: parseFloat(values.amount) } });
    },
  });
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <DashboardAppBar navigate={navigation} title="Create Order" />
      <ScrollView
        style={{ backgroundColor: "#ffffff", padding: 32 }}
        contentContainerStyle={{
          display: "flex",
          gap: 12,
        }}
      >
        <TextInput
          value={createOrderFormik.values.amount}
          variant="outlined"
          label="Enter Amount"
          keyboardType="numeric"
          onChangeText={createOrderFormik.handleChange("amount")}
          onBlur={createOrderFormik.handleBlur("amount")}
          helperText={createOrderFormik.errors.amount && createOrderFormik.touched.amount ? createOrderFormik.errors.amount : ""}
        />
        <TextInput
          value={createOrderFormik.values.address}
          variant="outlined"
          label="Enter Address"
          onChangeText={createOrderFormik.handleChange("address")}
          onBlur={createOrderFormik.handleBlur("address")}
          helperText={createOrderFormik.errors.address && createOrderFormik.touched.address ? createOrderFormik.errors.address : ""}
        />
        <TextInput
          value={createOrderFormik.values.contactName}
          variant="outlined"
          label="Enter Contact Name"
          onChangeText={createOrderFormik.handleChange("contactName")}
          onBlur={createOrderFormik.handleBlur("contactName")}
          helperText={createOrderFormik.errors.contactName && createOrderFormik.touched.contactName ? createOrderFormik.errors.contactName : ""}
        />
        <TextInput
          value={createOrderFormik.values.contactNumber}
          variant="outlined"
          label="Enter Contact Number"
          onChangeText={createOrderFormik.handleChange("contactNumber")}
          onBlur={createOrderFormik.handleBlur("contactNumber")}
          helperText={createOrderFormik.errors.contactNumber && createOrderFormik.touched.contactNumber ? createOrderFormik.errors.contactNumber : ""}
        />
        <DefaultTextInput
          value={createOrderFormik.values.extraInfo}
          multiline={true}
          placeholder="Extra Info"
          numberOfLines={5}
          style={{
            height: 200,
            borderColor: "#e2e8f0",
            borderWidth: 1,
            paddingTop: 16,
            padding: 16,
            fontSize: 16,
            borderRadius: 2,
          }}
          onChangeText={createOrderFormik.handleChange("extraInfo")}
          onBlur={createOrderFormik.handleBlur("extraInfo")}
        />
        <Button
          onPress={createOrderFormik.handleSubmit as any}
          loading={createOrderFormik.isSubmitting}
          disabled={!isObjectEmpty(createOrderFormik.errors) || isObjectEmpty(createOrderFormik.touched)}
          title="Create Order"
          style={{ marginTop: 12, paddingVertical: 8 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateOrder;
