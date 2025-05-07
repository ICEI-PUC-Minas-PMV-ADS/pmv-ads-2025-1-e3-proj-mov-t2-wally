import { View, StyleSheet, Text, Image } from "react-native";

export default function Wallet(){
  return (
    <View style={styles.container}>
       <View style={styles.header}>
       <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}/>
       </View>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  header: {
    backgroundColor: '#9ACBD0',
    height: 100,
    paddingTop: 60,
  },
  logo: {
    width: 96,
    height: 96,
    marginTop: 60,
    alignSelf: 'center',
  }
})