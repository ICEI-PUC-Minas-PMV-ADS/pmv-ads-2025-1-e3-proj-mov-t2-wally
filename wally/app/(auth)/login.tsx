import React, { useCallback } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import BlueButton from "@/components/BlueButton";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useLoginViewModel } from "@/viewModels/useLoginViewModel";

export default function LoginScreen() {
  useFonts({
    Poppins_700Bold,
    Poppins_300Light,
  });

  const { handleSubmitLogin, control } = useLoginViewModel()

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)!</Text>

      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      <Text>Senha</Text>
      <Controller
        control={control}
        name="senha"
        render={({ field }) => (
          <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} secureTextEntry />
        )}
      />

      <BlueButton text="ENTRAR" color="blue" onPress={() => {
        handleSubmitLogin()
      }} />

      <BlueButton text="Voltar para a tela inicial" color="lightblue" onPress={() => router.push("/")} />

      <BlueButton text="Esqueci minha senha" color="lightblue" onPress={() => router.push("/recuperarsenha")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Poppins_700Bold",
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontFamily: "Poppins_300Light",
  },
  link: {
    marginTop: 15,
    color: "blue",
    fontFamily: "Poppins_300Light",
  },
});