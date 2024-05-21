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
import { userRegister } from '../services/UserService';
import { useUser } from '../contexts/UserContext';
import { LoginContext } from '../contexts/LoginContext';
import appColors from "../assets/styles/appColors";

const RegisterScreen = () => {
  const image = require("../assets/Background.png");

  const [usernameInput, setUsernameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [dni, setDni] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [registerError, setRegisterError] = useState(false);
  const { toggleIsUserLogged, setEmail } = useContext(LoginContext);
  const { setUser } = useUser();

  const usernameHandle = (username: string) => {
    setUsernameInput(username);
  };

  const surnameHandle = (surname: string) => {
    setSurnameInput(surname);
  }

  const dniHandle = (dni: string) => {
    setDni(dni);
  }

  const emailHandle = (email: string) => {
    setEmailInput(email);
  };

  const passwordHandle = (password: string) => {
    setPasswordInput(password);
  };

  const userRegistration = async () => {
    let user = {
      DNI: dni,
      Nombre: usernameInput,
      Apellidos: surnameInput,
      email: emailInput,
      password: passwordInput
    };

    if (user.Nombre === '' || user.DNI === '' || user.Apellidos === '' || user.email === '' || user.password === '') {
      setRegisterError(true);
      return Alert.alert('❌ Error en el registro', 'Todos los campos son obligatorios');
    };

    let response = await userRegister(user);

    if (response.httpCode === 201 || response.httpCode === 200) {
      toggleIsUserLogged();
      setUser(response.userData);
      console.log('Registration completed');
      Alert.alert(`✅ Se ha creado el usuario ${emailInput}`, 'Se te redigirá a la pantalla de inicio', [
        { text: 'Ok' },
      ]);

      setRegisterError(false);
    } else {
      console.log('Registration failed');
      Alert.alert('❌ Error en el registro', 'Nombre de usuario y/o email ya en uso');
      setRegisterError(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Registro</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={usernameHandle}
              />
              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={surnameHandle}
              />
              <TextInput
                style={styles.input}
                placeholder="DNI"
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={dniHandle}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="gray"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={emailHandle}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={passwordHandle}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={userRegistration}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

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
    width: "90%",
    height: "90%",
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
    height: "11%",
    paddingHorizontal: 10,
    marginBottom: 30,
    color: "black",
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
