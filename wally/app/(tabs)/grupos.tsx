import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Text,
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Stack } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useGruposViewModel } from '@/viewModels/useGruposViewModel';

export default function TabTwoScreen() {

  const router = useRouter();

  const { grupos } = useGruposViewModel()

  return (
    <SafeAreaView style={styles.container}>

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerStyle: { backgroundColor: '#9ACBD0' },
        }} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain" />
      </View>

        <Text style={styles.titulo}>GRUPOS</Text>

        <FlatList
          data={grupos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push({
              pathname: '/grupo',
              params: {
                id: item.id,
              }})}>
              <View style={styles.item}>
                <Text style={styles.itemTexto}>{item.nome}</Text>
              </View>
            </Pressable>
          )}
          showsVerticalScrollIndicator={true}
        />
   
      <View style={styles.containerBotao}>

        <Pressable
          style={styles.botaoCriarGrupo}
          onPress={() => router.push('/criar-grupo')}
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
  logoContainer: {
    alignSelf: 'center',
    top: 36,
    zIndex: 2,
  },
  logo: {
    width: 76,
    height: 76,
  },
  titulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 66,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    borderWidth: 1,
    borderColor: '#9ACBD0',
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
  containerBotao: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 3,
  },
  botaoCriarGrupo: {
    top: 28,
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
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
});