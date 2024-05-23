import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './components/CustomDrawer';
import Header from './components/Header';
import appColors from './assets/styles/appColors';
import LoginProvider from './providers/LoginProvider';
import { UserProvider } from './contexts/UserContext';
import VehicleProvider from './providers/VehicleProvider';
import { RentProvider } from './contexts/RentContext';
import RentedVehicleProvider from './providers/RentedVehicleProvider';

export default function App() {

  return (
    <NavigationContainer>
      <LoginProvider>
        <UserProvider>
          <VehicleProvider>
            <RentProvider>
              <RentedVehicleProvider>
                <View style={styles.container}>
                  <Header />
                  <StatusBar style="auto" />
                  <CustomDrawer />
                </View>
                </RentedVehicleProvider>
            </RentProvider>
          </VehicleProvider>
        </UserProvider>
      </LoginProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: appColors.backgroundColor
  },
});
