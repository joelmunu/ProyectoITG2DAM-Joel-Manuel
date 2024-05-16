import { StyleSheet, ScrollView, ImageBackground, View } from 'react-native'
import React from 'react'
import VHCard from './VHCard'

const CardList = () => {
  return (
    <View style={styles.cardListContainer}>
        <ScrollView contentContainerStyle={styles.cardListScrollView}>
          {
            <VHCard></VHCard>
          }
        </ScrollView>
    </View>
  )
}

export default CardList

const styles = StyleSheet.create({
  cardListContainer: {
    flex: 20,
    width: '90%'
  },
  cardListScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})