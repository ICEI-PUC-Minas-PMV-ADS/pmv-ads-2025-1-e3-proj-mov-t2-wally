import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

export default function AdicionarDespesaGrupo() {

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackVisible: true,
          headerBackTitle: 'Voltar',
          headerTintColor: '#006A71',
          headerStyle: { backgroundColor: '#F4F2F2' },
        }} />

      <SafeAreaView style={styles.container}>

        <View style={styles.header} />

        <View style={styles.mainContent}>

          <Text style={styles.titulo}>Viagem Praia 🏝️</Text>
          <Text style={styles.subTitulo}>Você deve R$2.345,26</Text>


          <Text style={styles.labelNome}>Você pagou:</Text>
          <TextInput
            style={styles.input}
            placeholder="Valor" />
          <TextInput
            style={styles.input}
            placeholder="Data" />
          <TextInput
            style={styles.input}
            placeholder="Nome da Despesa" />

          <Text style={styles.labelNome}>Dividir por todos:</Text>

          <TouchableOpacity
            style={styles.botaoCriar}
            accessible={true}
            accessibilityLabel="Salvar"
            accessibilityHint="Toque para salvar despesa"
            accessibilityRole="button">
            <Text style={styles.textoBotao}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  header: {
    backgroundColor: '#9ACBD0',
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    paddingHorizontal: 30,
  },
  titulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 36,
  },
  subTitulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 46,
    marginTop: 6,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  labelNome: {
    fontFamily: 'Inter',
    padding: 8,
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    marginTop: 56,
  },
  labelTipo: {
    fontFamily: 'Inter',
    padding: 8,
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    marginTop: 40,
  },
  tiposContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipoItem: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  tipoItemSelecionado: {
    borderColor: '#48A6A7',
    borderWidth: 2,
  },
  containerBotao: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 60,
    zIndex: 3,
  },
  botaoAddmebro: {
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCriar: {
    width: 330,
    height: 52,
    marginTop: 20,
    backgroundColor: '#006A71',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoAddmebro: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});