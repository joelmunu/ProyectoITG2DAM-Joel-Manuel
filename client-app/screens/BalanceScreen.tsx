import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import appColors from "../assets/styles/appColors";


const BalanceScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {

  function navigateToProfile() {
    navigation.navigate("Perfil de usuario")
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Añadir saldo</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Añadir saldo"
              placeholderTextColor="gray"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigateToProfile()}>
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Añadir saldo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backgroundColor
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: appColors.secondary,
    width: "80%",
    height: 300,
    borderRadius: 9,
    padding: 20,
  },
  header: {},
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: appColors.accentColor,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 40,
    maxHeight: 50,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60
  },
  button: {
    backgroundColor: '#3066BE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: "45%",
    textAlignVertical: "center",
    borderColor: "#3066BE",
    borderWidth: 10
  },
  returnButton: {
    backgroundColor: appColors.errorColor,
    borderColor: appColors.errorColor,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
