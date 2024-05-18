import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  TextInput,
} from "react-native";
import appColors from "../assets/styles/appColors";

const LoginScreen = () => {
  const image = require("../assets/Background.png");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Iniciar Sesión</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="gray"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "rgba(174, 236, 239, 0.5)", // Adds a semitransparent overlay
    width: "80%",
    height: "45%",
    borderRadius: 9,
    padding: 20, // Add padding to the form container
  },
  header: {},
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20, // Add some space below the title
  },
  inputContainer: {
    marginBottom: 20, // Add some space between the inputs and the button
  },
  input: {
    backgroundColor: appColors.accentColor,
    borderRadius: 5,
    height: "25%",
    paddingHorizontal: 10,
    marginBottom: 30,
    color: "black",
  },
  buttonContainer: {},
  button: {
    marginTop: "-10%",
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#3066BE",
    paddingVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
