import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import appColors from '../assets/styles/appColors';
import { NavigationProp, ParamListBase } from "@react-navigation/native";

const VehicleScreen = ({
    navigation,
  }: {
    navigation: NavigationProp<ParamListBase>;
  }) => {
    const [fechaInicioInput, setFechaInicioInput] = useState('');
    const [fechaFinInput, setFechaFinInput] = useState('');

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

    const startDateHandler = (fechaInicio : string) => {
        setFechaInicioInput(fechaInicio);
    }

    const endDateHandler = (fechaFin : string) => {
        setFechaFinInput(fechaFin);
    }

    function navigateToRent() {
        navigation.navigate('Detalles del pago');
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.vhInfo}>
                    <Image style={styles.image} source={obtenerImagen("arona")} />
                    <View style={styles.verticalLine}></View>
                    <View style={styles.vhProperties}>
                        <Text style={styles.text}>SEAT</Text>
                        <Text style={styles.text}>Arona</Text>
                        <Text style={styles.text}>1.5 150cv gasolina</Text>
                        <Text style={styles.priceText}>33€/dia</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.description}>El SEAT Arona es un SUV urbano que combina diseño elegante con tecnología avanzada. Su frontal llamativo, faros Full LED y aireadores iluminados destacan. Además, ofrece conectividad SEAT CONNECT, seguridad y comodidad.</Text>
            </View>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de inicio (DD/MM/YYYY)"
                    onChangeText={startDateHandler}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de fin (DD/MM/YYYY)"
                    onChangeText={endDateHandler}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigateToRent()}>
                    <Text style={styles.buttonText}>Alquilar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VehicleScreen;

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
        height: "40%",
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
    button: {
        backgroundColor: '#3066BE',
        padding: 10,
        borderRadius: 5,
        marginTop: 50,
        alignItems: 'center',
        width: "33%",
        alignSelf: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
