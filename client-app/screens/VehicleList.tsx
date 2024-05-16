import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import appColors from '../assets/styles/appColors';

interface Vehicle {
  fabricante: string;
  modelo: string;
  motorizacion: string;
  precioDia: number;
}

interface Props {
  vhData: Vehicle[];
}

const VehicleList: React.FC<Props> = ({ vhData }) => {
  // Datos de ejemplo
  const datosEjemplo: Vehicle[] = [
    {
      fabricante: 'Ford',
      modelo: 'Focus',
      motorizacion: 'Gasolina',
      precioDia: 50,
    },
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    {
      fabricante: 'Toyota',
      modelo: 'Corolla',
      motorizacion: 'Híbrido',
      precioDia: 60,
    },
    // Agrega más datos de ejemplo aquí según sea necesario
  ];

  // Combinar datos de ejemplo solo si vhData está definido
  const datosCompletos = vhData ? [...datosEjemplo, ...vhData] : datosEjemplo;

  // Función para obtener la ruta de la imagen según el modelo del coche
  const obtenerImagen = (modelo: string) => {
    switch (modelo.toLowerCase()) {
      case 'focus':
        return require('../assets/focus.png');
      case 'corolla':
        return require(`../assets/corolla.png`);
      
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardContainer}
        data={datosCompletos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.vhInfo}>
              <Image style={styles.image} source={obtenerImagen(item.modelo)} />
              <View style={styles.verticalLine}></View>
              <View style={styles.vhProperties}>
                <Text style={styles.text}>{item.fabricante}</Text>
                <Text style={styles.text}>{item.modelo}</Text>
                <Text style={styles.text}>{item.motorizacion}</Text>
                <Text style={styles.priceText}>{`Precio por día: ${item.precioDia}€`}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: appColors.secondary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    marginBottom: 5,
    color: appColors.titleColor,
  },
  cardContainer: {
    width: '100%',
    height: '88%',
    padding: 20,
    marginVertical: 10,
  },
  vhInfo: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 180,
    marginLeft: -20,
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

export default VehicleList as React.ComponentType<any>;
