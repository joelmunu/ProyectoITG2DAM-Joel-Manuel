import { StyleSheet, View } from 'react-native';
import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import appColors from '../assets/styles/appColors';
import VehicleList from '../screens/VehicleList';
import UserProfile from '../screens/UserProfile';
import VehicleScreen from '../screens/VehicleScreen';
import RentScreen from '../screens/RentScreen';

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerStyle: {
      backgroundColor: appColors.primary,
    },
    headerTintColor: appColors.titleColor,
    drawerItemStyle: {
      width: '90%',
    },
    drawerStyle: {
      backgroundColor: appColors.primary
    },
    drawerActiveTintColor: appColors.titleColor,
    drawerActiveBackgroundColor: appColors.secondary,
    //drawerInactiveTintColor: appColors.textColor,
    drawerInactiveBackgroundColor: appColors.secondary,
    drawerType: 'slide',
  };

  return (
    <View style={styles.container}>
    <Drawer.Navigator initialRouteName='Lista de Vehículos' screenOptions={drawerNavigatorScreenOptions}>
      <Drawer.Screen name='Lista de Vehículos' component={VehicleList} options={{ title: 'Lista de Vehículos' }} />
      <Drawer.Screen name='Perfil de usuario' component={UserProfile} options={{ title: 'Perfil de usuario' }} />
      <Drawer.Screen name='Vehiculo' component={VehicleScreen} options={{ title: 'Vehiculo' }} />
      <Drawer.Screen name='Detalles del pago' component={RentScreen} options={{ title: 'Detalles del pago' }} />
    </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});