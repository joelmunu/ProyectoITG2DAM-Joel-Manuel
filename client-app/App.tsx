import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './components/CustomDrawer';
import Header from './components/Header';
import appColors from './assets/styles/appColors';
import LoginProvider from './providers/LoginProvider';
import { UserProvider } from './contexts/UserContext';

export default function App() {

  return (
    <NavigationContainer>
      <LoginProvider>
        <UserProvider>
          <View style={styles.container}>
            <Header />
            <StatusBar style="auto" />
            <CustomDrawer />
          </View>
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
