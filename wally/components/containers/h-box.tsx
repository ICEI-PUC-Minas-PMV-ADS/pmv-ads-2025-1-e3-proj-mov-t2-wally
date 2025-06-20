import React from "react";
import { StyleSheet, View } from "react-native";

const HBox = ({ children, style, wrap, onLayout, gap }: any) => {
  const _selfStyles = [styles.self, style];
  if (wrap) {
    _selfStyles.push({ flexWrap: "wrap" });
  }

  if (gap) {
    _selfStyles.push({ gap });
  }

  return (
    <View onLayout={onLayout} style={_selfStyles}>
      {children}
    </View>
  );
};

export default HBox;

const styles = StyleSheet.create({
  self: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});
