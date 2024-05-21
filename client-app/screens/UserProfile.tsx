import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import appColors from '../assets/styles/appColors';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import { LoginContext } from '../contexts/LoginContext';
import { useUser } from '../contexts/UserContext';

const UserProfile = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {

  const { email, toggleIsUserLogged } = useContext(LoginContext);
  const { user } = useUser();

  const logoutHandle = () => {
    toggleIsUserLogged(false);
    console.log('Log out completed')
    Alert.alert('Se ha cerrado la sesión ✅', 'Tendrá que iniciar sesión de nuevo para acceder a la app', [
      {
        text: 'Iniciar sesión',
        onPress: () => {
          navigation.navigate("Inicio de sesión");
        },
        style: 'default',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate("Bienvenida");
        },
        style: 'default',
      },
    ]);
  };

  const logout = () => {
    Alert.alert(`⚠️ Se va a cerrar la sesión de ${email}`, 'Para acceder a los datos tendrá que iniciar sesión de nuevo', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Logout canceled'),
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        onPress: (logoutHandle),
        style: 'default',
      },
    ]);
  };

  const imageMap: any = {
    focus: require('../assets/focus.png'),
    corolla: require('../assets/corolla.png'),
    arona: require('../assets/aronafr.png'),
    ibiza: require('../assets/ibiza.png'),
    formentor: require('../assets/formentor.png'),
    gladiator: require('../assets/gladiator.png'),
  };

  const obtenerImagen = (modelo: string) => {
    const normalizedModelo = modelo.toLowerCase();
    return imageMap[normalizedModelo] || require('../assets/default.png');
  };

  function navigateToBalance() {
    navigation.navigate("Balance")
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.vhInfo}>
          <View style={styles.vhProperties}>
            <Text style={styles.daysText}>Tu información</Text>
            <Text style={styles.text}>Nombre: {user?.Nombre}</Text>
            <Text style={styles.text}>Apellidos: {user?.Apellidos}</Text>
            <Text style={styles.text}>DNI: {user?.DNI}</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.vhProperties}>
          <Text style={styles.daysText}>Saldo de Tenerife Rent a Car: {user?.Saldo}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigateToBalance()}>
            <Text style={styles.buttonText}>➕  Añadir saldo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.vhInfo}>
          <Image style={styles.image} source={obtenerImagen("arona")} />
          <View style={styles.verticalLine}></View>
          <View style={styles.vhProperties}>
            <Text style={styles.text}>SEAT</Text>
            <Text style={styles.text}>Arona</Text>
            <Text style={styles.text}>1.5 150cv gasolina</Text>
            <Text style={styles.daysText}>Fecha alquiler:</Text>
            <Text style={styles.daysText}>{user?.InicioAlquiler} - {user?.FinAlquiler}</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.button, styles.logoutBtn]}>
          <Text style={[styles.buttonText, styles.logoutBtnText]} onPress={logout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backgroundColor,
    alignItems: 'center',
  },
  card: {
    backgroundColor: appColors.secondary,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    width: "93%",
    height: "20%",
  },
  vhInfo: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 180,
    marginLeft: -16,
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  vhProperties: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  text: {
    color: appColors.titleColor,
    fontSize: 15,
  },
  description: {
    color: appColors.titleColor,
    fontSize: 18,
    marginTop: 15,
    marginLeft: 5
  },
  daysText: {
    color: appColors.titleColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'white',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderRadius: 5,
    backgroundColor: "#80DED9",
    marginTop: 20,
    paddingHorizontal: 10,
    minHeight: 50
  },
  button: {
    backgroundColor: appColors.sucessColor,
    padding: 14,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: "43%",
    alignSelf: "center"
  },
  logoutBtn: {
    backgroundColor: appColors.errorColor,
    marginTop: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  logoutBtnText: {
    color: 'white',
  },
});

export default UserProfile;

