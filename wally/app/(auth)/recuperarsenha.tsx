import React from "react";
import { useFonts, Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, Alert, SafeAreaView, StatusBar, Image } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";

export default function RecuperarSenha() {
  
  useFonts({ Poppins_700Bold, Poppins_300Light });

  const handleEnviar = (data: { email: string }) => {
    Alert.alert("Recuperar Senha", `Enviamos um link para ${data.email}`);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        
        <StatusBar backgroundColor="#9ACBD0" barStyle="light-content" />

        <View style={styles.botaoVoltar}>

          <Pressable
            onPress={() => router.push('/(auth)/login')}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#006A71" />
          </Pressable>

        </View>

        <Image
          source={require('@/assets/images/index_logo.png')}
          style={styles.logo} />

        <Text style={styles.logoText}>WALLY</Text>

        <View style={styles.mainContent}>

          <Text style={styles.title}>
            Informe seu e-mail cadastrado para receber um link de recuperação de senha
          </Text>

          <Text style={styles.texto}>E-mail</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.containerBotao}>

            <TouchableOpacity
              style={styles.botaoEnviar}
              accessible={true}
              accessibilityLabel="Enviar"
              accessibilityHint="Toque para enviar e-mail"
              accessibilityRole="button">
              <Text style={styles.textoBotao}>ENVIAR</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  mainContent: {
    flex: 1,
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
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 26,
    marginTop: 26,
    padding: 6,
    fontFamily: "Poppins_300Light",
    color: '#00494E',
  },
  texto: {
    fontFamily: 'Poppins_300Light',
    padding: 8,
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    marginTop: 16,
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
  link: {
    marginTop: 15,
    color: "blue",
    fontFamily: "Poppins_300Light",
  },
  containerBotao: {
    alignItems: 'center',
    padding: 10,
    marginTop: 86,
  },
  botaoEnviar: {
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSenha: {
    width: 330,
    height: 52,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoSenha: {
    color: "#006A71",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});