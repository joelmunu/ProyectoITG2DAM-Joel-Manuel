import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import appColors from '../assets/styles/appColors';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import { useVehicleContext } from '../contexts/VehicleContext';
import { useUser } from '../contexts/UserContext';
import { useRentContext } from '../contexts/RentContext';
import { updateBalance } from '../services/BalanceService';
import { getClientByDNI } from '../services/UserService';
import { useRentedVehicleContext } from '../contexts/RentedVehicleContext';

const RentScreen = ({
    navigation,
}: {
    navigation: NavigationProp<ParamListBase>;
}) => {
    const { selectedVehicle, setSelectedVehicle } = useVehicleContext();
    const { selectedRentedVehicle, setSelectedRentedVehicle } = useRentedVehicleContext();
    const { user } = useUser();
    const { rentDetails, setRentDetails } = useRentContext();

    if (!selectedVehicle || !rentDetails) {
        return null;
    }

    const { startDate, endDate } = rentDetails;

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

    const calculateDays = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const days = calculateDays(startDate, endDate);
    const totalPrice = days * selectedVehicle.PrecioDia;
    const remainingBalance = user?.Saldo ? user.Saldo - totalPrice : 0;

    const formatDate = (dateString: string): string => {
        // Verificar si la fecha es null o undefined
        if (!dateString) {
            throw new Error('La fecha no puede ser nula o indefinida.');
        }

        // Verificar el formato de la de fecha
        const dateRegex = /^\d{2}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateString)) {
            throw new Error(`Formato de fecha inválido (${dateString}). Use YY-MM-DD.`);
        }

        // La fecha ya está en el formato YY-MM-DD
        return dateString;
    };

    const confirmRent = () => {
        Alert.alert(`❓ Se va a proceder a alquilar un ${selectedVehicle.Fabricante + " " + selectedVehicle?.Modelo}`, '¿Desea proceder?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Alquilar',
                onPress: handleRent,
                style: 'default',
            },
        ]);
    }

    const handleRent = async () => {
        let clientData;

        try {
            clientData = await getClientByDNI(user?.DNI);
        } catch (error) {
            console.error("Error al obtener el cliente:", error);
            navigation.navigate('Lista de Vehículos');
            setSelectedVehicle(null);
        }

        if (!user || remainingBalance <= 0) {
            Alert.alert('❌ Error', 'Saldo insuficiente para realizar el alquiler.', [
                {
                  text: 'Añadir saldo',
                  onPress: () => navigation.navigate('Balance'),
                  style: 'default',
                },
                {
                  text: 'Aceptar',
                  style: 'default',
                },
              ]);
            navigation.navigate('Lista de Vehículos');
            setSelectedVehicle(null);
            return;
        } else if (clientData?.clientData?.inicioAlquiler != null || clientData?.clientData?.finAlquiler != null || clientData?.clientData?.matriculaAlq != null) {
            Alert.alert('❌ Error', 'Ya ha alquilado un coche, debe cancelar el contrato actual para realizar otro.', [
                {
                  text: 'Ir a mi perfil',
                  onPress: () => navigation.navigate('Perfil de usuario'),
                  style: 'default',
                },
                {
                  text: 'Aceptar',
                  style: 'default',
                },
              ]);
            navigation.navigate('Lista de Vehículos');
            setSelectedVehicle(null);
            return;
        } else {
            updateBalance(user.DNI, -totalPrice)
        }

        let formattedStartDate;
        let formattedEndDate;

        try {
            formattedStartDate = formatDate(startDate);
            formattedEndDate = formatDate(endDate);
        } catch (error: any) {
            Alert.alert('Error', error.message);
            setSelectedVehicle(null)
            return;
        }

        const rentData = {
            matricula: selectedVehicle.MatriculaCar,
            dni: user.DNI,
            InicioAlquiler: formattedStartDate,
            FinAlquiler: formattedEndDate,
        };
        console.log(JSON.stringify(rentData))
        try {
            const response = await fetch('http://192.168.0.21:8000/api/v1/rentacartf/rent', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rentData),
            });

            const responseText = await response.text();

            if (!response.ok) {
                Alert.alert('Error', responseText);
                setSelectedVehicle(null)
                return;
            }

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                Alert.alert('❌ Error', 'Se produjo un error al procesar la respuesta del servidor.');
                return;
            }

            if (data && response.ok) {
                Alert.alert('✅ Se ha alquilado el vehículo con éxito', 'Puede gestionar su contrato desde la pantalla de perfil.', [
                    {
                      text: 'Ir a mi perfil',
                      onPress: () => navigation.navigate('Perfil de usuario'),
                      style: 'default',
                    },
                    {
                        text: 'Aceptar',
                        style: 'default',
                    }
                  ]);
                setRentDetails({
                    startDate: rentData.InicioAlquiler,
                    endDate: rentData.FinAlquiler,
                    rentedVehicle: selectedVehicle,
                });
                setSelectedRentedVehicle(selectedVehicle)
                setSelectedVehicle(null)
                navigation.navigate('Lista de Vehículos');
            } else {
                Alert.alert('Error', data.message || 'Se produjo un error al procesar el alquiler.');
                navigation.navigate('Lista de Vehículos');
                setSelectedVehicle(null);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Se produjo un error al procesar el alquiler.');
            navigation.navigate('Lista de Vehículos');
            setSelectedVehicle(null);
        }
    };

    function navigateToVehicle() {
        navigation.navigate('Vehiculo');
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.vhInfo}>
                    <Image style={styles.image} source={obtenerImagen(selectedVehicle.Modelo)} />
                    <View style={styles.verticalLine} />
                    <View style={styles.vhProperties}>
                        <Text style={styles.text}>{selectedVehicle.Fabricante}</Text>
                        <Text style={styles.text}>{selectedVehicle.Modelo}</Text>
                        <Text style={styles.text}>{selectedVehicle.Motorizacion}</Text>
                        <Text style={styles.priceText}>{`${selectedVehicle.PrecioDia}€/dia`}</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <Text style={[styles.order, styles.marginTop]}>
                    Duración del alquiler: {days} días
                </Text>
                <Text style={styles.order}>
                    Precio total: {totalPrice} €
                </Text>
                <View style={[styles.horizontalLine, styles.marginTop]} />
                <Text style={styles.order}>
                    Pago con saldo:
                </Text>
                <Text style={styles.text}>
                    Titular: {user?.Nombre} {user?.Apellidos}
                </Text>
                <Text style={styles.text}>
                    Saldo disponible: {user?.Saldo} €
                </Text>
                <Text style={styles.text}>
                    Saldo tras el alquiler: {remainingBalance} €
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={navigateToVehicle}>
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={confirmRent}>
                        <Text style={styles.buttonText}>Alquilar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RentScreen;

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
});
