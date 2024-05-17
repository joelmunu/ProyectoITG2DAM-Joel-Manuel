import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './components/CustomDrawer';
import Header from './components/Header';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <StatusBar style="auto" />
        <CustomDrawer />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
