import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import appColors from '../assets/styles/appColors';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useVehicleContext } from '../contexts/VehicleContext';

const VehicleList = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { vehicleData, getVehicleData, setSelectedVehicle } = useVehicleContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getVehicleData();
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };
    fetchData();
  }, [getVehicleData]);

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

  const handleVehiclePress = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    navigation.navigate('Vehiculo');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardContainer}
        data={vehicleData}
        renderItem={({ item }) => (
          <View style={[styles.card, item.Alquilado ? styles.rented : null]}>
            {item.Alquilado ? (
              <View style={styles.vhInfo}>
                <Image style={styles.image} source={require("../assets/default.png")} />
                <View style={styles.verticalLine}></View>
                <View style={styles.vhProperties}>
                  <Text style={styles.text}>{item.Fabricante}</Text>
                  <Text style={styles.text}>{item.Modelo}</Text>
                  <Text style={styles.text}>{item.Motorizacion}</Text>
                  <Text style={styles.priceText}>{`Precio por día: ${item.PrecioDia}€`}</Text>
                </View>
              </View>
            ) : (
              <Pressable onPress={() => handleVehiclePress(item)}>
                <View style={styles.vhInfo}>
                  <Image style={styles.image} source={obtenerImagen(item.Modelo)} />
                  <View style={styles.verticalLine}></View>
                  <View style={styles.vhProperties}>
                    <Text style={styles.text}>{item.Fabricante}</Text>
                    <Text style={styles.text}>{item.Modelo}</Text>
                    <Text style={styles.text}>{item.Motorizacion}</Text>
                    <Text style={styles.priceText}>{`Precio por día: ${item.PrecioDia}€`}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    flex: 1,
  },
  card: {
    backgroundColor: appColors.secondary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  rented: {
    backgroundColor: "gray"
  },
  cardContainer: {
    padding: 20,
    flex: 1,
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
  priceText: {
    color: appColors.titleColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
});

export default VehicleList;
