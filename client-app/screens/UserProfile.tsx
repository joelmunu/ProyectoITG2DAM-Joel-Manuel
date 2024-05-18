import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import appColors from '../assets/styles/appColors';

const UserProfile = () => {

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

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.vhInfo}>
          <View style={styles.vhProperties}>
            <Text style={styles.daysText}>Tu información</Text>
            <Text style={styles.text}>Nombre: John</Text>
            <Text style={styles.text}>Apellidos: Doe</Text>
            <Text style={styles.text}>DNI: 12345678A</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.vhInfo}>
          <View style={styles.vhProperties}>
            <Text style={styles.daysText}>200€</Text>
            <Text style={styles.daysText}>Saldo de Tenerife Rent a Car</Text>
          </View>
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
            <Text style={styles.daysText}>17/02/24 - 19/02/24</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: appColors.errorColor,
    padding: 14,
    borderRadius: 5,
    marginTop: 50,
    alignItems: 'center',
    width: "43%",
    alignSelf: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfile;

