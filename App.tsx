import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./screens/user/Home";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import ForgotPassword from "./screens/auth/ForgotPassword";
import ResetPassword from "./screens/auth/ResetPassword";
import OTPVerification from "./screens/auth/OTPVerification";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}
          ></Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="OTPVerification"
              component={OTPVerification}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
