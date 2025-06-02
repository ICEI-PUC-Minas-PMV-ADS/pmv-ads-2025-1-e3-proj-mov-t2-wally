import React from "react";
import { StyleSheet, View } from "react-native";

const VBox = ({ children, style, onLayout }: any) => {
  return (
    <View onLayout={onLayout} style={[styles.self, style]}>
      {children}
    </View>
  );
};

export default VBox;

const styles = StyleSheet.create({
  self: {
    flexDirection: "column",
    width: "100%",
  },
});
