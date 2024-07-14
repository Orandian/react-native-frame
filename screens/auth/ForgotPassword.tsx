import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import InputBox from '@/components/app/InputBox';
import CustomButton from '@/components/app/CustomButton';
import colors from '@/constants/Colors';

type RootStackParamList = {
  ForgotPassword: undefined;
  OTPVerification: undefined;
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSendOTP = () => {
    console.log('Sending OTP to:', email);
   
    navigation.navigate('OTPVerification');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.description}>
        We will send you an OTP code to your email. Please enter your email address.
      </Text>
      <InputBox
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <CustomButton title="Send OTP" onPress={handleSendOTP} size="large" color={colors.primaryColor} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});