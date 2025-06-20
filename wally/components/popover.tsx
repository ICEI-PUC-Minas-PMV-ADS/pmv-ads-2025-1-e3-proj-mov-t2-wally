import React, { Fragment, type PropsWithChildren } from "react";
import * as Animatable from "react-native-animatable";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  type StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from "react-native";
import { Portal } from "@gorhom/portal";
import { Icon } from "react-native-paper";
import Canvas from "./containers/canvas";
import HBox from "./containers/h-box";
import BodyText from "./body-text";
import Spacer from "./spacer";
import { COLORS, SIZES } from "@/enums/theme";

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: Dimensions.get("window").width,
    zIndex: 500,
    top: -30,
    bottom: 0,
  },
  backdrop: {
    justifyContent: "flex-end",
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content_wrapper: {
    overflow: "hidden",
    backgroundColor: '#ffffff',
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    width: "100%",
  },
  bodyWrapper: {
    padding: 16,
    paddingTop: 0,
    width: "100%",
  },
  loading_wrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    zIndex: 10000001,
    backgroundColor: "rgba(255,255,255,0.75)",
    alignItems: "center",
    justifyContent: "center",
  },
  cancel_btn: {
    marginBottom: 4,
  },
  header_wrapper: {
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  popup_title: {
    flex: 1,
  },
  dismissButtonText: {
    fontSize: 16,
    lineHeight: 20,
  },
});

export type Props = {
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  isLoading?: boolean;
  closeButtonText?: string;
  contentStyle?: StyleProp<ViewStyle>;
  onCloseButtonPress?: () => void;
  titleStartIcon?: string;
  hideCloseButton?: boolean;
};

const Popover = ({
  onDismiss,
  children,
  style,
  title,
  isLoading = false,
  closeButtonText,
  contentStyle,
  onCloseButtonPress,
  titleStartIcon,
  hideCloseButton = false,
}: PropsWithChildren<Props>) => {
  return (
    <Portal>
      <Animatable.View
        animation="fadeInUp30px"
        duration={400}
        style={[styles.wrapper]}
      >
        <Pressable style={styles.backdrop} onPress={onDismiss}>
          <Pressable
            style={[styles.content_wrapper, style]}
            onPress={() => {
              // no-op; override backdrop press event
            }}
          >
            <HBox style={styles.header_wrapper}>
              {titleStartIcon && (
                <Fragment>
                  <Icon
                    name={titleStartIcon}
                    size={SIZES.xLarge}
                    color={COLORS.black}
                  />
                  <Spacer width={8} />
                </Fragment>
              )}
              <BodyText
                h={3}
                bold={true}
                value={title}
                style={styles.popup_title}
              />
              {!hideCloseButton && (
                <TouchableOpacity
                  style={styles.cancel_btn}
                  onPress={onCloseButtonPress || onDismiss}
                >
                  {closeButtonText ? (
                    <BodyText
                      h={3}
                      value={closeButtonText}
                      style={styles.dismissButtonText}
                    />
                  ) : (
                    <Icon
                      name="close"
                      size={SIZES.xLarge}
                      color={COLORS.black}
                    />
                  )}
                </TouchableOpacity>
              )}
            </HBox>
            <View style={[styles.bodyWrapper, contentStyle]}>{children}</View>
          </Pressable>
        </Pressable>
        {isLoading && (
          <Canvas style={styles.loading_wrapper}>
            <ActivityIndicator />
          </Canvas>
        )}
        <Spacer height={10} />
      </Animatable.View>
    </Portal>
  );
};

export default Popover;
