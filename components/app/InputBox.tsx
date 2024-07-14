import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InputBoxProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: string;
};

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  multiline = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, multiline && styles.textArea]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          multiline={multiline}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={!isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      width: '100%', // Ensure the container takes full width
    },
    label: {
      marginBottom: 5,
      fontSize: 16,
      color: 'gray',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      width: '100%', // Ensure the input container takes full width
    },
    input: {
      flex: 1,
      padding: 10,
      fontSize: 16,
      width: '100%', // Ensure the input takes full width
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    iconContainer: {
      padding: 10,
    },
  });

export default InputBox;