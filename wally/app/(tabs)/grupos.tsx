import { View, StyleSheet, Image, StatusBar, SafeAreaView, FlatList, Text, Pressable } from 'react-native';
import React from 'react';

export default function TabTwoScreen() {

  const items = [
    { id: '1', title: 'Apartamento 106' },
    { id: '2', title: 'Viagem Europa' },
    { id: '3', title: 'Empresa X' },
    { id: '4', title: 'Escritório' },
  ]

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#9ACBD0"
        barStyle={'dark-content'} />

      <View style={styles.header} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.listaGrupos}>
        <Text style={styles.titulo}>GRUPOS</Text>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTexto}>{item.title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  header: {
    backgroundColor: '#9ACBD0',
    height: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 80,
  },
  logo: {
    width: 96,
    height: 96,
    top: 80,
  },
  titulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  listaGrupos: {
    top: 200,
    padding: 30,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemTexto: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#000',
  },
});
