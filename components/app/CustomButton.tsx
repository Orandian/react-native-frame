import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  size?: 'large' | 'medium' | 'small';
  color?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  size = 'medium',
  color = '#007BFF',
  buttonStyle,
  textStyle,
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'large':
        return { width: screenWidth * 0.9 }; // 90% of screen width
      case 'medium':
        return { width: screenWidth * 0.5 }; // 50% of screen width
      case 'small':
        return { width: screenWidth * 0.25 }; // 25% of screen width
      default:
        return { width: screenWidth * 0.5 }; // Default to medium size
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getSizeStyle(), { backgroundColor: color }, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CustomButton;