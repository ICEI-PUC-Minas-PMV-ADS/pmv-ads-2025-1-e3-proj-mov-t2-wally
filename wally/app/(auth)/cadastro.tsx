import React, { useCallback } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useCadastroViewModel } from "@/viewModels/useCadastroViewModel"; import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Cadastro() {
  const { handleSubmitCadastro, control } = useCadastroViewModel()

  return (
    <>
      <SafeAreaView style={styles.container}>

        <View style={styles.botaoVoltar}>

          <Pressable
            onPress={() => router.push('/')}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#006A71" />
          </Pressable>

        </View>

        <Image
          source={require('@/assets/images/index_logo.png')}
          style={styles.logo} />

        <Text style={styles.logoText}>WALLY</Text>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >

          <Text style={styles.texto}>Nome</Text>

          <Controller
            control={control}
            name="nome"
            render={({ field }) => (
              <TextInput placeholder="Digite seu nome" style={styles.input} value={field.value} onChangeText={field.onChange} />
            )}
          />

          <Text style={styles.texto}>E-mail<Text style={{ color: 'red' }}>*</Text></Text>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput placeholder="Digite seu e-mail" style={styles.input} value={field.value} onChangeText={field.onChange} keyboardType="email-address" />
            )}
          />

          <Text style={styles.texto}>Telefone</Text>

          <Controller
            control={control}
            name="telefone"
            render={({ field }) => (
              <TextInput placeholder="Digite seu telefone" style={styles.input} value={field.value} onChangeText={field.onChange} />
            )}
          />

          <Text style={styles.texto}>Data de Nascimento</Text>

          <Controller
            control={control}
            name="dataNascimento"
            render={({ field }) => (
              <TextInput placeholder="Digite sua data de nascimento" style={styles.input} value={field.value} onChangeText={field.onChange} />
            )}
          />

          <Text style={styles.texto}>Senha<Text style={{ color: 'red' }}>*</Text></Text>

          <Controller
            control={control}
            name="senha"
            render={({ field }) => (
              <TextInput placeholder="Digite sua senha" style={styles.input} value={field.value} onChangeText={field.onChange} secureTextEntry />
            )}
          />

          <Text style={styles.texto}>Confirmar Senha<Text style={{ color: 'red' }}>*</Text></Text>

          <Controller
            control={control}
            name="confirmarSenha"
            render={({ field }) => (
              <TextInput placeholder="Confirme sua senha" style={styles.input} value={field.value} onChangeText={field.onChange} secureTextEntry />
            )}
          />
        </ScrollView>
        
        <View style={styles.containerBotao}>
          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => { handleSubmitCadastro(); }}
            accessible={true}
            accessibilityLabel="Cadastrar"
            accessibilityHint="Toque para se cadastrar"
            accessibilityRole="button">
            <Text style={styles.textoBotao}>CADASTRAR</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
    padding: 20,
    margin: 8,
  },
  botaoVoltar: {
    position: 'absolute',
    left: 8,
    padding: 16,
  },
  logo: {
    width: 66,
    height: 66,
    alignSelf: 'center',
    marginTop: 56,
  },
  logoText: {
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
    marginBottom: 10,
    marginTop: 16,
  },
  botaoEntrar: {
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
    marginTop: 46,
    marginBottom: 46,
  },
});
