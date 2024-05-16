import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import appColors from '../assets/styles/appColors'

const Card = () => {

    return (
        <View style={styles.cardContainer}>
            <View style={styles.vhInfo}>
                <Image style={styles.image} source={require("../assets/arona.png")} />
                <View style={styles.verticalLine}></View>
                <View style={styles.vhProperties}>
                    <Text style={styles.text}>Seat Arona FR</Text>
                    <Text style={styles.text}>5 plazas</Text>
                    <Text style={styles.text}>3 maletas</Text>
                    <Text style={styles.text}>1.5 150cv gasolina</Text>
                    <Text style={styles.priceText}>Precio: 30€/día</Text>
                </View>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        width: '99%',
        height: "88%",
        padding: 20,
        backgroundColor: appColors.secondary,
        borderRadius: 20,
        marginVertical: 10,
    },
    vhInfo: {
        flexDirection: "row",
    },
    image: {
        height: 100,
        width: 180,
        marginLeft: -33,
    },
    verticalLine: {
        width: 1,
        height: "100%",
        backgroundColor: "white",
        marginHorizontal: 10, // Ajustar el espacio entre la imagen y la línea vertical
    },
    vhProperties: {
        flexDirection: "column",
        marginLeft: 5,
    },
    text: {
        color: appColors.titleColor,
        fontSize: 15
    },
    priceText: {
        color: appColors.titleColor,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5
    }
})
