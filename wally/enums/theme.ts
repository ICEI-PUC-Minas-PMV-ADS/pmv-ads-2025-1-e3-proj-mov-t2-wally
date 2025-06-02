const COLORS = {
  palette: {
    color1: "#9CC8E3",
    color2: "#3D7A99",
    color3: "#333537",
    color4: "#F4C742",
    color5: "#FF3E00",
    color6: "#cc0000",
    color7: "#fde8e0",
  },
  text: {
    black: "#333333",
    offBlack: "#808080",
    white: "#ffffff",
  },
  form: {
    borderColor: "#dddddd",
  },
  darkBackground: "#212121",
  veryLightGray: "#f2f2f2",
  lightGray: "#d6d6d6",
  midGray: "#adadad",
  gray: "#9e9e9e",
  darkerGray: "#b9b9b9",
  darkerGray2: "#7d7d7d",
  white: "#ffffff",
  offWhite: "#f6f6f6",
  black: "#000000",
  offBlack: "#333333",
  green: "#00723d",
  errorColor: "#ff0000",
  shadowColor: "#333333",
  borderColor: "#dddddd",
  placeholderTextColor: "#adadad",
  underlayColor: "#f0f0f0",
  darkGray: "#333333",
  lighterGray: "#f6f6f6",
};

const FONT = {
  regular: "Outfit-Regular",
  regularItalic: "Outfit-Regular",
  lightItalic: "Outfit-Light",
  regularBold: "Outfit-Bold",
  regularSemiBold: "Outfit-SemiBold",
  materialIcons: "Material-Icons",
};

const SIZES = {
  xxxSmall: 7,
  xxSmall: 9,
  xSmall: 12,
  small: 14,
  medium: 16,
  semi_large: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
};

const STYLE = {
  error_text: {
    color: COLORS.errorColor,
    fontSize: SIZES.xSmall,
    marginTop: 5,
    zIndex: -1,
  },
  error_wrapper: {
    backgroundColor: "rgba(255,0,0,0.03)",
    borderColor: COLORS.errorColor,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0, // These are the x and y offsets
      height: 2, // Increase this value for a 'lower' shadow
    },
    shadowOpacity: 0.75, // Lower this for a more translucent shadow
    shadowRadius: 5, // Higher values will make the shadow bigger

    // To make sure the shadow is rendered
    elevation: 5,
  },
  very_light_shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 5, // For Android (similar effect to shadow properties)
  },
  light_shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5, // For Android (similar effect to shadow properties)
  },
  medium_shadow: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, // For Android (similar effect to shadow properties)
  },
  borderRadius: 12,
  value_12: 12,
  value_8: 8,
  half_default_padding: 6,
  default_padding: 12,
  padding_one_half: 16,
  double_padding: 24,
  triple_padding: 36,
};

export { COLORS, FONT, SIZES, STYLE };
