import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import appColors from '../assets/styles/appColors';
import { getVehicleData, Vehicle } from '../services/RentService'; // Assuming your API functions are in api.ts
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface Props { }

const VehicleList = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVehicleData();
        setVehicleData(data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };
    fetchData();
  }, []);

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

  function navigateToVehicle() {
    navigation.navigate('Vehiculo');
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardContainer}
        data={vehicleData}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigateToVehicle()}>
            <View style={styles.card}>
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
            </View>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure parent view has flex: 1
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: appColors.secondary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardContainer: {
    width: '100%',
    // Remove or adjust bottom padding if needed
    padding: 20, // Adjust padding as needed

    flex: 1, // Allow FlatList to expand and scroll
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
