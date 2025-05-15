import React from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabTwoScreen() {

  return (
    <SafeAreaView style={styles.container}>

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerStyle: { backgroundColor: '#9ACBD0' },
        }} />

      <StatusBar backgroundColor="#9ACBD0" barStyle="dark-content" />

      <View style={styles.addPhoto}>
        <MaterialIcons name="add-a-photo" size={40} color="#006A71" />
      </View>

      <Text style={styles.addPhotoText}>Atualizar foto de perfil</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true} >

        <Text style={styles.texto}>Editar nome</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome" />

        <Text style={styles.texto}>Alterar e-mail<Text style={{ color: 'red' }}>*</Text></Text>

        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address" />

        <Text style={styles.texto}>Atualizar telefone</Text>

        <TextInput
          placeholder="(00) 0000 0000"
          style={styles.input} />

        <Text style={styles.texto}>Data de Nascimento</Text>

        <TextInput placeholder="Editar data de nascimento" style={styles.input} />

        <Text style={styles.texto}>Atualizar senha<Text style={{ color: 'red' }}>*</Text></Text>

        <TextInput
          placeholder="Digite sua nova senha"
          style={styles.input} />

        <Text style={styles.texto}>Confirmar nova senha<Text style={{ color: 'red' }}>*</Text></Text>

        <TextInput
          placeholder="Confirme sua nova senha"
          style={styles.input} />

      </ScrollView>

      <TouchableOpacity style={styles.trashIconContainer}>
        <Ionicons name="trash-sharp" size={24} color="#006A71" />
      </TouchableOpacity>

      <Text style={styles.deleteAccountText}>Excluir conta</Text>

      <View style={styles.containerBotao}>

        <TouchableOpacity
          style={styles.botaoSalvar}
          accessible={true}
          accessibilityLabel="Salvar"
          accessibilityHint="Toque para salvar as edições"
          accessibilityRole="button">
          <Text style={styles.textoBotao}>SALVAR</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
    padding: 20,
    margin: 8,
  },
  addPhoto: {
    alignSelf: 'center',
    marginTop: 36,
  },
  addPhotoText: {
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    fontSize: 12,
    color: '#777',
    marginTop: 6,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 26,
    paddingHorizontal: 16,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#fff',
    fontFamily: 'Inter',
  },
  texto: {
    fontFamily: 'Poppins_300Light',
    padding: 8,
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
    marginTop: 8,
  },
  botaoSalvar: {
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  containerBotao: {
    alignItems: 'center',
    padding: 10,
    marginTop: 26,
    marginBottom: 16,
  },
  trashIconContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  deleteAccountText: {
    fontFamily: "Poppins_300Ligth",
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 6,
  },
});
