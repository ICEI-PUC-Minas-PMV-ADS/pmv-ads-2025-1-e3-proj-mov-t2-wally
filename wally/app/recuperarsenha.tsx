import React from "react";
import { StyleSheet, View, Text, Image, TextInput, Pressable, Alert } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import Logo from '../assets/images/index_logo.png';
import { router } from "expo-router";

export default function RecuperarSenha() {
  useFonts({
    Poppins_700Bold,
    Poppins_300Light
  });

  const handleEnviar = () => {
    Alert.alert("Recuperar Senha", "Enviamos um link para o seu e-mail.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={{ width: 80, height: 80 }} />
        <Text style={styles.logoText}>WALLY</Text>
      </View>

      <Text style={styles.textTitle}>Recuperar Senha</Text>
      <Text style={styles.textSection}>
        Informe seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
      </Text>

      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        keyboardType="email-address"
      />

      <Pressable style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </Pressable>

      <Pressable onPress={() => router.navigate("/login")}>
        <Text style={styles.linkText}>Voltar para login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  header: {
    alignItems: "center",
    marginBottom: 20
  },
  logoText: {
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    fontSize: 16,
    marginTop: 5
  },
  textTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15
  },
  textSection: {
    fontFamily: "Poppins_300Light",
    fontSize: 14,
    textAlign: "center",
    width: 310,
    marginBottom: 20
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: "Poppins_300Light"
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold"
  },
  linkText: {
    color: "#1E90FF",
    fontFamily: "Poppins_300Light"
  }
});