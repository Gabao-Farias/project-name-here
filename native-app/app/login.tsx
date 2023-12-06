import React, { FC, useContext, useEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import Loading from "../components/Loading";
import { Text, View } from "../components/Themed";
import { AuthContext } from "../contexts/AuthContext";

type Props = {};

const LoginScreen: FC<Props> = () => {
  const { signIn, refreshToken, refreshingToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    signIn({
      email,
      password,
    });
  };

  useEffect(() => {
    refreshToken();
  }, []);

  if (refreshingToken) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <View style={styles.formWrapper}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter part value"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter part value"
        />

        <Button title="Sign In" onPress={onSignIn} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formWrapper: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
