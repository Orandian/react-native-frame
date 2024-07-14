import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/app/CustomButton";
import { ParamListBase } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

type RootStackParamList = {
  ResetPassword: undefined;
  OTPVerification: undefined;
  ForgotPassword: undefined;
};

type OTPVerificationProps = NativeStackScreenProps<ParamListBase, 'OTPVerification'>;

type Props = NativeStackScreenProps<RootStackParamList, "OTPVerification">;

const OTPVerification: React.FC<OTPVerificationProps> = ({ navigation }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [pinReady, setPinReady] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [codeErrorText, setCodeErrorText] = useState("");
  const [showResendBtn, setShowResendBtn] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(600);
  const textInputRefs = useRef<Array<TextInput | null>>([]);
  const maximumCodeLength = 4;

  const [loading, setLoading] = useState<boolean>(false);
  const [internetConnection, setInternetConnection] = useState<boolean>(true);

  const userEmail = "user@example.com"; // Replace with actual user email

  const BackHandler = () => {
    navigation.goBack();
  };

  const navigationResetPassword = () => {
    navigation.navigate("ResetPassword");
  };

  const handleOnChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < maximumCodeLength - 1) {
      textInputRefs.current[index + 1]?.focus();
    }
  };

  const checkingOtp = async (userEmail: string, code: string) => {
    // Simulate an API call
    const data = { isOnline: true, err: "", result: { verifyCode: "1234" } };

    if (data.isOnline === false) {
      setInternetConnection(false);
      Alert.alert("Error", "Internet Connection Disabled");
      return;
    }

    if (data.err && data.err !== "") {
      setShowResendBtn(true);
      setCodeError(true);
      setCodeErrorText("Wrong OTP");
      setTimeout(() => {
        setCodeError(false);
        setCodeErrorText("");
      }, 2000);
      return;
    }

    setTimeout(() => {
      setInternetConnection(true);
      navigationResetPassword();
      // Simulate setting OTP code in context
      console.log("OTP Verified:", data.result.verifyCode);
    }, 1000);
  };

  const forgottingPassword = async (userEmail: string) => {
    setLoading(true);
    // Simulate an API call
    const data = { err: "" };

    if (data) {
      setLoading(false);
    }

    if (data.err !== "") {
      return;
    }
  };

  const resendCodeHandler = () => {
    setShowResendBtn(false);
    setCodeError(false);
    setSeconds(600);
    setCode(["", "", "", ""]);

    forgottingPassword(userEmail);
  };

  useEffect(() => {
    setPinReady(code.every((digit) => digit !== ""));

    if (code.every((digit) => digit !== "")) {
      checkingOtp(userEmail, code.join(""));
    }
  }, [code]);

  useEffect(() => {
    let intervalId: any;

    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        {!internetConnection && (
          <Text style={styles.alertText}>Internet Connection Disabled</Text>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.loginText}>Enter OTP code</Text>
        </View>

        {(seconds === 0 || codeError) && (
          <View style={{ marginTop: -25, marginBottom: 2 }}>
            <Text style={styles.errorText}>
              {seconds === 0 ? "OTP Time Out" : codeErrorText}
            </Text>
          </View>
        )}

        <View style={styles.checkotpContainer}>
          <Text style={styles.infoText}>
            Enter 4 digits code received on your
          </Text>
          <Text style={styles.infoText}>{userEmail}</Text>
        </View>

        <View style={styles.otpInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOnChange(text, index)}
              maxLength={1}
              keyboardType="number-pad"
              ref={(el) => (textInputRefs.current[index] = el)}
            />
          ))}
        </View>

        <View style={{ marginBottom: 20, marginTop: 10 }}>
          <Text style={styles.timerText}>
            {`${minutes.toString().padStart(2, "0")}:${remainingSeconds
              .toString()
              .padStart(2, "0")}`}
          </Text>
        </View>

        {(seconds === 0 || showResendBtn) && (
          <View style={styles.loginButtonContainer}>
            <CustomButton onPress={resendCodeHandler} title="Resend OTP" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  textContainer: {
    width: windowWidth,
    alignItems: "center",
    marginBottom: 40,
  },
  checkotpContainer: {
    width: windowWidth / 1.5,
    alignItems: "flex-end",
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  loginText: {
    fontSize: 35,
    fontWeight: "600",
  },
  errorText: {
    fontWeight: "300",
    color: "red",
    fontSize: 20,
  },
  infoText: {
    textAlign: "center",
    width: "100%",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  loginButtonContainer: {
    width: windowWidth / 1.2,
    marginBottom: -40,
  },
  backContainer: {
    position: "absolute",
    bottom: 30,
    left: 30,
  },
  backText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    color: "red",
    marginBottom: 10,
  },
});
