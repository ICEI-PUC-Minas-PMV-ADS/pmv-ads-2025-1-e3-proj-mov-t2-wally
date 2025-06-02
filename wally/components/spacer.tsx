import React from "react";
import { View, StyleSheet } from "react-native";

export default function Spacer({ width, height, style }: any) {
  const ownStyle = [styles.selfStyle, { width, height }, style];

  return <View style={ownStyle} />;
}

const styles = StyleSheet.create({
  selfStyle: {
    // Define your styles here...
  },
});
