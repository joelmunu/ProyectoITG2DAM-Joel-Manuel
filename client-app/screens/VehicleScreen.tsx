import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import appColors from '../assets/styles/appColors';
import { useVehicleContext } from '../contexts/VehicleContext';
import { useRentContext } from '../contexts/RentContext';

const VehicleScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { selectedVehicle } = useVehicleContext();
  const { setRentDetails } = useRentContext();

  const [fechaInicioInput, setFechaInicioInput] = useState('');
  const [fechaFinInput, setFechaFinInput] = useState('');

  if (!selectedVehicle) {
    return null;
  }

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

  const isValidDate = (date: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(date);
  };

  const formatDate = (date: string) => {
    const [day, month, year] = date.split('/');
    const shortYear = year.slice(-2); // Tomamos solo los últimos dos dígitos del año
    return `${shortYear}-${month}-${day}`;
  };

  const parseDate = (date: string) => {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const handleRent = () => {
    if (!fechaInicioInput || !fechaFinInput) {
      Alert.alert('Error', 'Por favor, complete ambas fechas.');
      return;
    }
  
    if (!isValidDate(fechaInicioInput) || !isValidDate(fechaFinInput)) {
      Alert.alert('Error', 'Formato de fecha incorrecto. Use DD/MM/YYYY.');
      return;
    }
  
    const startDate = parseDate(fechaInicioInput);
    const endDate = parseDate(fechaFinInput);
  
    if (startDate >= endDate) {
      Alert.alert('Error', 'La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }
  
    const formattedStartDate = formatDate(fechaInicioInput);
    const formattedEndDate = formatDate(fechaFinInput);
  
    setRentDetails({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      rentedVehicle: null,
    });
  
    navigation.navigate('Detalles del pago');
  };

  function navigateToVehicleList() {
    navigation.navigate('Lista de Vehículos');
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.vhInfo}>
          <Image style={styles.image} source={obtenerImagen(selectedVehicle.Modelo)} />
          <View style={styles.verticalLine}></View>
          <View style={styles.vhProperties}>
            <Text style={styles.text}>{selectedVehicle.Fabricante}</Text>
            <Text style={styles.text}>{selectedVehicle.Modelo}</Text>
            <Text style={styles.text}>{selectedVehicle.Motorizacion}</Text>
            <Text style={styles.priceText}>{`${selectedVehicle.PrecioDia}€/dia`}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.description}>{selectedVehicle.Descripcion}</Text>
      </View>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setFechaInicioInput}
          value={fechaInicioInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setFechaFinInput}
          value={fechaFinInput}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={navigateToVehicleList}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRent}>
            <Text style={styles.buttonText}>Alquilar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: appColors.backgroundColor
  },
  card: {
    backgroundColor: appColors.secondary,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    width: "93%",
    height: "45%",
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
  priceText: {
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
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#3066BE',
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
    marginRight: 20,
    alignItems: 'center',
    width: "33%",
    alignSelf: "center"
  },
  returnButton: {
    backgroundColor: appColors.errorColor
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
