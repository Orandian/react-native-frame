import React from "react";
import { View } from "react-native";

type SizeBoxProps = {
  width?: number;
  height?: number;
};

const SizeBox: React.FC<SizeBoxProps> = ({ width, height }) => {
  return <View style={[{ width: width, height: height }]} />;
};

export default SizeBox;
