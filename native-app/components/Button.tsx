import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colorPrimary, colorSecondary, colorText } from "../constants/Colors";

type Props = {
  variant?: "primary" | "secondary";
  onPress?: () => void;
};

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  variant = "primary",
  onPress,
}) => {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.buttonWrapper,
        backgroundColor: isPrimary ? colorPrimary : colorSecondary,
      }}
    >
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorPrimary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 99,
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colorText,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
});

export default Button;
