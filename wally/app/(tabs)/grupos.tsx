import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  FlatList,
  Text,
  Pressable
} from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
          resizeMode="contain" />
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

      <View style={styles.containerBotao}>
        <Pressable
          style={styles.botaoCriarGrupo}
          onPress={() => { }}
          accessible={true}
          accessibilityLabel="Criar grupo"
          accessibilityHint="Toque para criar um novo grupo"
          accessibilityRole="button"
        >
          <MaterialIcons name="group-add" size={28} color="#fff" />
          <Text style={styles.textoBotao}>CRIAR GRUPO</Text>
        </Pressable>
      </View>
      <View style={styles.containerBotao}>
        <Pressable
          style={styles.botaoCriarGrupo}
          onPress={() => { }}
          accessible={true}
          accessibilityLabel="Criar grupo"
          accessibilityHint="Toque para criar um novo grupo"
          accessibilityRole="button">
          <MaterialIcons name="group-add" size={28} color="#fff" />
          <Text style={styles.textoBotao}>CRIAR GRUPO</Text>
        </Pressable>
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
  botaoCriarGrupo: {
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  containerBotao: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
