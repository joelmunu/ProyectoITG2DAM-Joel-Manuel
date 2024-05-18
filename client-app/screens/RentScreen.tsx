import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import appColors from '../assets/styles/appColors'
import { NavigationProp, ParamListBase } from '@react-navigation/core'

const RentScreen = ({
    navigation,
}: {
    navigation: NavigationProp<ParamListBase>;
}) => {

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
            <View style={styles.card}>
                <View style={styles.vhInfo}>
                    <Image style={styles.image} source={obtenerImagen("arona")} />
                    <View style={styles.verticalLine} />
                    <View style={styles.vhProperties}>
                        <Text style={styles.text}>SEAT</Text>
                        <Text style={styles.text}>Arona</Text>
                        <Text style={styles.text}>1.5 150cv gasolina</Text>
                        <Text style={styles.priceText}>33€/dia</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <Text style={[styles.order, styles.marginTop]}>
                    Duración del alquiler: 7 días
                </Text>
                <Text style={styles.order}>
                    Precio total: 231€
                </Text>
                <View style={[styles.horizontalLine, styles.marginTop]} />
                <Text style={styles.order}>
                    Pago con saldo:
                </Text>
                <Text style={styles.text}>
                    Titular: John Doe
                </Text>
                <Text style={styles.text}>
                    Saldo disponible: 300 €
                </Text>
                <Text style={styles.text}>
                    Saldo tras el alquiler: 90 €
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigateToVehicle()}>
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Alquilar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default RentScreen

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
        paddingTop: 20,
        marginTop: 50,
        marginBottom: 10,
        width: "93%",
        height: "66%",
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
        marginTop: 4
    },
    order: {
        alignSelf: "center",
        color: appColors.titleColor,
        fontSize: 18,
        marginTop: 8,
        marginBottom: 4,
        fontWeight: "bold"
    },
    payData: {
        color: appColors.titleColor,
        fontSize: 18,
        marginTop: 15,
        marginLeft: 5
    },
    marginTop: {
        marginTop: 20
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
})