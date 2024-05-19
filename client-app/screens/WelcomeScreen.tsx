import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";

const WelcomeScreen = () => {
  const image = require("../assets/Background.png");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.title}>Rent a car Tenerife 🏎️</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

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
    backgroundColor: "rgba(0,0,0,0.3)", // Adds a semitransparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#3066BE",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});