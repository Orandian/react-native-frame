import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import InputBox from "@/components/app/InputBox";
import CustomButton from "@/components/app/CustomButton";
import colors from "@/constants/Colors";
import SizeBox from "@/components/app/SizeBox";
import flexBox from "@/constants/styles/FlexBox";
import { FontAwesome5 } from "@expo/vector-icons";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    console.log("Login attempt with:", username, password);
  };

  const handleGoToRegister = () => {
    navigation.navigate("Register");
  };

  const handleGoToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>Login</Text>
      <SizeBox height={20} />
      <InputBox
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <InputBox
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <SizeBox height={10} />
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.navigationText} onPress={handleGoToForgotPassword}>
          Forgot Password?
        </Text>
      </View>
      <SizeBox height={10} />
      <CustomButton
        title="Login"
        onPress={handleLogin}
        size="large"
        color={colors.primaryColor}
      />
      <SizeBox height={10} />
      <View style={flexBox.row}>
        <Text>Dont't have an account? </Text>
        <Text style={styles.navigationText} onPress={handleGoToRegister}>
          Join free today
        </Text>
      </View>
      <SizeBox height={20} />
      <View style={flexBox.row}>
        <FontAwesome5 name="facebook" size={30} color="black" />
        <SizeBox width={10} />
        <FontAwesome5 name="google" size={30} color="black" />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  navigationText: {
    textDecorationLine: "underline",
  },
  registerContainer: {},
});
