import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import appColors from "../assets/styles/appColors";
import { useUser } from "../contexts/UserContext";
import { updateBalance } from "../services/BalanceService";

const BalanceScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { user, setUser } = useUser();
  const [balanceInput, setBalanceInput] = useState<string>('');
  const [newBalance, setNewBalance] = useState<number>(0);

  function navigateToProfile() {
    navigation.navigate("Perfil de usuario");
  }

  function handleBalance(balance: string) {
    setBalanceInput(balance);
  }

  const handleUpdateBalance = async () => {
    if (!user?.DNI) {
      Alert.alert("Error", "No se pudo obtener el DNI del usuario");
      return;
    }
  
    const parsedBalance = parseInt(balanceInput);
    if (isNaN(parsedBalance)) {
      Alert.alert("Error", "Por favor, ingrese un saldo válido");
      return;
    }
  
    try {
      const { httpCode, message } = await updateBalance(user.DNI, parsedBalance);
      if (httpCode === 200) {
        Alert.alert("Éxito", "Saldo actualizado correctamente");
        setUser({
          DNI: user.DNI,
          Nombre: user.Nombre,
          Apellidos: user.Apellidos,
          email: user.email,
          Saldo: user.Saldo + parseInt(balanceInput)
        });
        setBalanceInput('');
      } else {
        Alert.alert("Error", `No se pudo actualizar el saldo: ${message}`);
        console.error(`Error ${httpCode}: ${message}`);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al actualizar el saldo");
      console.error('Error al actualizar el saldo:', error);
    }
  };
  

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
              onChangeText={handleBalance}
              value={balanceInput}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={navigateToProfile}
            >
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleUpdateBalance}>
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
    backgroundColor: appColors.backgroundColor,
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
  text: {
    color: appColors.titleColor,
    fontSize: 18,
    marginTop: -20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
  },
  button: {
    backgroundColor: "#3066BE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
    textAlignVertical: "center",
    borderColor: "#3066BE",
    borderWidth: 10,
  },
  returnButton: {
    backgroundColor: appColors.errorColor,
    borderColor: appColors.errorColor,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
