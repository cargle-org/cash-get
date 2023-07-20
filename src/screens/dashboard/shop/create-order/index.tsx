import { AppBar, Box, Button, Flex, Snackbar, Text, TextInput } from "@react-native-material/core";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { TextInput as DefaultTextInput, View, ScrollView, Keyboard } from "react-native";
import { createOrderValidationSchema } from "./validation";
import { isObjectEmpty } from "../../../../utils/misc";
import DashboardAppBar from "../../components/DashboardAppBar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "react-query";
import { orderApi } from "../../../../services/order.service";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/appSlice";
import { theme } from "../../../../utils/theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

type CreateOrderProps = NativeStackScreenProps<any>;

const CreateOrder = (props: CreateOrderProps) => {
  const { navigation } = props;
  const shop = useSelector((state: RootState) => state.auth.user);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    // Keyboard.dismiss();
  };

  const handleConfirm = (date: any) => {
    createOrderFormik.setFieldValue("deliveryPeriod", date);
    hideDatePicker();
  };
  const mutation = useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: ({ data, message, status }) => {
      createOrderFormik.setSubmitting(false);
      setSuccessMsg(message);
      createOrderFormik.resetForm();
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    },
    onError: (error: AxiosError) => {
      createOrderFormik.setSubmitting(false);
      setErrorMsg((error.response?.data as any)?.message || "Error encountered");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    },
  });

  const createOrderFormik = useFormik({
    validationSchema: createOrderValidationSchema,
    initialValues: {
      amount: "",
      address: "",
      contactName: "",
      contactNumber: "",
      deliveryPeriod: "",
      extraInfo: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate({ shopId: shop?.id || "", body: { ...values, amount: parseFloat(values.amount) } });
    },
  });

  const deliveryPeriod = useMemo(() => {
    let newDate = new Date(createOrderFormik?.values.deliveryPeriod).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return createOrderFormik.values.deliveryPeriod !== "" ? newDate : "";
  }, [createOrderFormik]);

  return (
    <View style={{ flex: 1 }}>
      <DashboardAppBar navigate={navigation} />
      <ScrollView
        style={{ backgroundColor: theme.colors["dark-100"], paddingHorizontal: 16 }}
        contentContainerStyle={{
          display: "flex",
          paddingVertical: 20,
          gap: 12,
        }}
      >
        <Text variant="h4" color={theme.colors["dark-300"]} style={{ textAlign: "center" }}>
          Create Order
        </Text>
        <TextInput
          value={createOrderFormik.values.amount}
          variant="outlined"
          label="Enter Amount"
          keyboardType="numeric"
          color={theme.colors["dark-500"]}
          inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
          onChangeText={createOrderFormik.handleChange("amount")}
          onBlur={createOrderFormik.handleBlur("amount")}
          helperText={createOrderFormik.errors.amount && createOrderFormik.touched.amount ? createOrderFormik.errors.amount : ""}
        />
        <TextInput
          value={createOrderFormik.values.address}
          variant="outlined"
          label="Enter Address"
          color={theme.colors["dark-500"]}
          inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
          onChangeText={createOrderFormik.handleChange("address")}
          onBlur={createOrderFormik.handleBlur("address")}
          helperText={createOrderFormik.errors.address && createOrderFormik.touched.address ? createOrderFormik.errors.address : ""}
        />
        <TextInput
          value={createOrderFormik.values.contactName}
          variant="outlined"
          label="Enter Contact Name"
          color={theme.colors["dark-500"]}
          inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
          onChangeText={createOrderFormik.handleChange("contactName")}
          onBlur={createOrderFormik.handleBlur("contactName")}
          helperText={createOrderFormik.errors.contactName && createOrderFormik.touched.contactName ? createOrderFormik.errors.contactName : ""}
        />
        <TextInput
          value={createOrderFormik.values.contactNumber}
          variant="outlined"
          label="Enter Contact Number"
          color={theme.colors["dark-500"]}
          inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
          onChangeText={createOrderFormik.handleChange("contactNumber")}
          onBlur={createOrderFormik.handleBlur("contactNumber")}
          helperText={createOrderFormik.errors.contactNumber && createOrderFormik.touched.contactNumber ? createOrderFormik.errors.contactNumber : ""}
        />
        <TouchableOpacity
          onPress={showDatePicker}
          // style={styles.buttonContainer}
          activeOpacity={0.8}
        >
          {/* <Text>Hello</Text> */}
          <TextInput
            value={deliveryPeriod}
            variant="outlined"
            label="Enter Delivery Period"
            color={theme.colors["dark-500"]}
            inputStyle={{ backgroundColor: theme.colors["dark-100"] }}
            onFocus={() => setDatePickerVisibility(true)}
            onBlur={createOrderFormik.handleBlur("deliveryPeriod")}
            helperText={
              createOrderFormik.errors.deliveryPeriod && createOrderFormik.touched.deliveryPeriod ? createOrderFormik.errors.deliveryPeriod : ""
            }
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          minimumDate={new Date()}
          date={(createOrderFormik.values.deliveryPeriod as any) || new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <DefaultTextInput
          value={createOrderFormik.values.extraInfo}
          multiline={true}
          placeholder="Extra Info"
          numberOfLines={5}
          style={{
            height: 200,
            borderColor: theme.colors["dark-200"],
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
          style={{ marginTop: 12, paddingVertical: 10 }}
          color={theme.colors["dark-500"]}
        />
      </ScrollView>
      {errorMsg !== "" && (
        <Snackbar
          message={errorMsg}
          action={<Button variant="text" title="Dismiss" onPress={() => setErrorMsg("")} color={theme.colors["dark-100"]} compact />}
          style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
        />
      )}

      {successMsg !== "" && (
        <Snackbar
          message={successMsg}
          action={
            <Button
              variant="text"
              title="View Order"
              onPress={() => navigation.navigate("shop-view-orders")}
              color={theme.colors["dark-100"]}
              compact
            />
          }
          style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
        />
      )}
    </View>
  );
};

export default CreateOrder;
