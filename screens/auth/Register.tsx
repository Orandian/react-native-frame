import CustomButton from '@/components/app/CustomButton';
import InputBox from '@/components/app/InputBox';
import SizeBox from '@/components/app/SizeBox';
import colors from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert, Text } from 'react-native';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    return re.test(password);
  };

  const handleRegister = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Invalid password', 'Password must be at least 5 characters long and include both letters and numbers.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    console.log('Register attempt with:', username, email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>Register</Text>
      <InputBox
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <InputBox
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <InputBox
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <InputBox
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <SizeBox height={10} />
      <CustomButton title="Register" onPress={handleRegister} size="large" color={colors.primaryColor} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});