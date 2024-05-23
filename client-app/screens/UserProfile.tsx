import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import appColors from '../assets/styles/appColors';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import { LoginContext } from '../contexts/LoginContext';
import { useUser } from '../contexts/UserContext';
import { useRentContext } from '../contexts/RentContext';
import { useRentedVehicleContext } from '../contexts/RentedVehicleContext';
import { getClientByDNI } from '../services/UserService';
import { getVehicleByPlate } from '../services/RentService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {

  interface User {
    DNI: string;
    Nombre: string;
    Apellidos: string;
    email: string;
    Saldo: number;
    InicioAlquiler?: string | null;
    FinAlquiler?: string | null;
    MatriculaAlq?: string | null;
  }

  const { email, toggleIsUserLogged } = useContext(LoginContext);
  const { setRentDetails } = useRentContext();
  const { selectedRentedVehicle, setSelectedRentedVehicle } = useRentedVehicleContext();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { clientData } = await getClientByDNI(user?.DNI);
        if (clientData) {
          const currentClientData: User = {
            DNI: clientData.dni || '',
            Nombre: clientData.nombre || '',
            Apellidos: clientData.apellidos || '',
            email: clientData.email || '',
            Saldo: clientData.saldo || 0,
            InicioAlquiler: clientData.inicioAlquiler,
            FinAlquiler: clientData.finAlquiler,
            MatriculaAlq: clientData.matriculaAlq
          };
          setUser(currentClientData);

          if (currentClientData.MatriculaAlq) {
            const vehicleDetails = await getVehicleByPlate(currentClientData.MatriculaAlq);
            setSelectedRentedVehicle(vehicleDetails[0]);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const logoutHandle = () => {
    toggleIsUserLogged(false);
    console.log('Log out completed');
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
    setRentDetails({
      startDate: "",
      endDate: "",
      rentedVehicle: null,
    });
    Alert.alert(`⚠️ Se va a cerrar la sesión de ${email}`, 'Para acceder a los datos tendrá que iniciar sesión de nuevo', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Logout canceled'),
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        onPress: logoutHandle,
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

  const navigateToBalance = async () => {
    navigation.navigate("Balance");
  };

  const requestData = {
    matricula: user?.MatriculaAlq,
    dni: user?.DNI
  };

  const cancelRent = () => {
    console.log(user?.FinAlquiler)
    Alert.alert('⚠️ ATENCIÓN:', `Va a cancelar el contrato del vehículo ${selectedRentedVehicle?.MatriculaCar}, ¿está seguro?`, [
      {
        text: 'Atrás',
        style: 'cancel',
      },
      {
        text: 'Cancelar el alquiler',
        onPress: cancelRentHandle,
        style: 'default',
      },
    ]);
  }

  const cancelRentHandle = async () => {
    try {
      await fetch('http://192.168.0.21:8000/api/v1/rentacartf/cancelrent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      Alert.alert('✅ Cancelación del contrato completada', `Se ha cancelado el contrato del vehículo ${selectedRentedVehicle?.MatriculaCar}`, [
        {
          text: 'Aceptar',
          style: 'default',
        }
      ]);
      setRentDetails({
        startDate: "",
        endDate: "",
        rentedVehicle: null,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
      return;
    }
  };

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
          <FontAwesomeIcon icon={faUser} style={styles.icon}/>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.vhProperties}>
          <Text style={styles.daysText}>Saldo de Tenerife Rent a Car: {user?.Saldo} €</Text>
          <TouchableOpacity style={styles.button} onPress={navigateToBalance}>
            <Text style={styles.buttonText}>➕  Añadir saldo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.card, styles.rentCard]}>
        {selectedRentedVehicle && user?.MatriculaAlq ? (
          <View style={styles.rentCardData}>
            <View style={styles.vhInfo}>
              <Image style={styles.image} source={obtenerImagen(selectedRentedVehicle.Modelo)} />
              <View style={styles.verticalLine}></View>
              <View style={styles.vhProperties}>
                <Text style={styles.text}>Fabricante: {selectedRentedVehicle.Fabricante}</Text>
                <Text style={styles.text}>Modelo: {selectedRentedVehicle.Modelo}</Text>
                <Text style={styles.text}>Matrícula: {user?.MatriculaAlq}</Text>
                <Text style={styles.daysText}>Duración alquiler:</Text>
                <Text style={styles.text}>{formatDate(user?.InicioAlquiler)} - {formatDate(user?.FinAlquiler)}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={cancelRent} style={styles.cancelBtn}>
              <Text style={[styles.buttonText, styles.logoutBtnText]}>Cancelar alquiler</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.vhInfo}>
            <Text style={styles.noRentText}>No se ha alquilado ningún vehículo</Text>
          </View>
        )}
        <TouchableOpacity style={[styles.button, styles.logoutBtn]} onPress={logout}>
          <Text style={[styles.buttonText, styles.logoutBtnText]}>Cerrar sesión</Text>
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
  rentCard: {
    height: "28%",
  },
  vhInfo: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  icon: {
    color: appColors.titleColor,
    marginTop: 10,
    marginRight: 10,
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
    marginLeft: 5,
  },
  daysText: {
    color: appColors.titleColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  noRentText: {
    color: appColors.titleColor,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: -22
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
    minHeight: 50,
  },
  button: {
    backgroundColor: appColors.sucessColor,
    padding: 14,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: "43%",
    alignSelf: "center",
  },
  logoutBtn: {
    backgroundColor: appColors.errorColor,
    marginTop: 60,
    width: "45%"
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  logoutBtnText: {
    color: 'white',
  },
  rentCardData: {
    width: "100%",
    alignContent: "center",
  },
  cancelBtn: {
    backgroundColor: appColors.warningColor,
    padding: 14,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
    width: "44%",
  }
});

export default UserProfile;
