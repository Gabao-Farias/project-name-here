import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const Loading: FC<Props> = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrapper: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
