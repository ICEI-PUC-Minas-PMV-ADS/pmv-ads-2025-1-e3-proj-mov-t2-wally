import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLORS, FONT, SIZES } from "../enums/theme";

export default function BodyText({
  value,
  style,
  numberOfLines,
  h = 0,
  bold = false,
  italic = false,
  color = null,
  children,
  selectable = false,
}: any) {
  const ownStyle = [styles.selfStyle, style];

  if (bold) {
    ownStyle.push({ fontFamily: FONT.regularBold });
  } else if (italic) {
    ownStyle.push({ fontFamily: FONT.regularItalic });
  }

  if (color) {
    ownStyle.push({ color });
  }

  if (h > 0) {
    let size = SIZES.medium;
    switch (h) {
      case 1:
        size = SIZES.xxLarge;
        break;
      case 2:
        size = SIZES.xLarge;
        break;
      case 3:
        size = SIZES.large;
        break;
      case 4:
        size = SIZES.medium;
        break;
      case 5:
        size = SIZES.small;
        break;
      case 6:
        size = SIZES.xSmall;
        break;
      case 7:
        size = SIZES.xxSmall;
        break;
    }
    ownStyle.push({ fontSize: size });
  }

  return (
    <Text
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      style={ownStyle}
      selectable={selectable}
      selectionColor={selectable && COLORS.palette.color5}
    >
      {value || children}
    </Text>
  );
}

const styles = StyleSheet.create({
  selfStyle: {
    color: COLORS.text.black,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
  },
});
