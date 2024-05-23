import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { useContext, useState } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { userLogin } from '../services/UserService';
import appColors from "../assets/styles/appColors";
import { useUser } from "../contexts/UserContext";

const LoginScreen = () => {
  const image = require("../assets/Background.png");

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { toggleIsUserLogged, setEmail } = useContext(LoginContext);
  const { setUser } = useUser();

  const emailHandle = (username: string) => {
    setEmailInput(username);
  };

  const passwordHandle = (password: string) => {
    setPasswordInput(password);
  };

  const showFailedLoginAlert = () => {
    Alert.alert('❌ Error al iniciar sesión', 'Nombre de usuario o contraseña incorrectos');
  };

  const login = async () => {
    const user = {
      email: emailInput,
      password: passwordInput
    };
    let response = await userLogin(user);
    console.log(response)
    if ((response.httpCode) == 200) {
      setUser(response.userData);
      toggleIsUserLogged();
      setEmail(emailInput);
      console.log('Login completed');
      setLoginError(false);
    } else {
      console.log('Login failed');
      showFailedLoginAlert();
      setLoginError(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Iniciar Sesión</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={loginError ? ({ ...styles.label, ...styles.labelError }) : (styles.label)}>
                Correo electrónico:
              </Text>
              <TextInput
                style={loginError ? ({ ...styles.input, ...styles.inputError }) : (styles.input)}
                placeholder="Correo electrónico"
                placeholderTextColor="gray"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={emailHandle}
              />
              <Text style={loginError ? ({ ...styles.label, ...styles.labelError }) : (styles.label)}>Contraseña:</Text>
              <TextInput
                style={loginError ? ({ ...styles.input, ...styles.inputError }) : (styles.input)}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={passwordHandle}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={login}>
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
    height: 418,
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
    height: "20%",
    paddingHorizontal: 10,
    marginBottom: 30,
    color: "black",
  },
  inputError: {
    borderColor: appColors.errorColor,
    borderWidth: 2
  },
  buttonContainer: {},
  button: {
    marginTop: "-20%",
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
  label: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 5,
    color: appColors.titleColor,
    fontWeight: 'bold'
  },
  labelError: {
    color: appColors.errorColor
  },
});
