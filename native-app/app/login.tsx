import React, { FC, useContext, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { Text, View } from "../components/Themed";
import { colorText } from "../constants/Colors";
import { AuthContext } from "../contexts/AuthContext";

type Props = {};

const LoginScreen: FC<Props> = () => {
  const { signIn, refreshingToken, signUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUpStatus, setSignUpStatus] = useState<AsyncCallStatus>("idle");

  const onSignIn = () => {
    signIn({
      email,
      password,
    });
  };

  const onSignUp = async () => {
    setSignUpStatus("loading");

    try {
      await signUp({
        email,
        password,
      });

      setSignUpStatus("success");

      setTimeout(() => {
        setSignUpStatus("idle");
      }, 5000);
    } catch (error) {
      setSignUpStatus("failed");

      setTimeout(() => {
        setSignUpStatus("idle");
      }, 5000);
    }
  };

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

      {signUpStatus === "success" && (
        <Text style={styles.title}>
          Great, you're signed up! Now just hit the Sign In!
        </Text>
      )}

      {signUpStatus === "failed" && (
        <Text style={styles.title}>
          Oops, something has gone wrong, probably this email has already been
          used...
        </Text>
      )}

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

        <Button onPress={onSignUp}>Sign Up</Button>
        <Button variant="secondary" onPress={onSignIn}>
          Sign In
        </Button>
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
    padding: 24,
  },
  formWrapper: {
    marginTop: 20,
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
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
