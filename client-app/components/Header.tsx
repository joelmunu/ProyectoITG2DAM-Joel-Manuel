import { StyleSheet, Text, View } from 'react-native'
import appColors from '../assets/styles/appColors'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Rent a Car TF</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: appColors.primary,
        width: '100%',
    },
    headerTitle: {
        color: appColors.titleColor,
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 25,
        marginLeft: 10,
        textAlign: "center"
    }
})