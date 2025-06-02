import React from "react";
import { StyleSheet, View } from "react-native";

const Canvas = ({ children, style, onLayout }: any) => {
  return (
    <View onLayout={onLayout} style={[styles.self, style]}>
      {children}
    </View>
  );
};

export default Canvas;

const styles = StyleSheet.create({
  self: {
    flex: 1,
  },
});
