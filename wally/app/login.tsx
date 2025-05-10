import React from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import BlueButton from "@/components/BlueButton";
import { router } from "expo-router";

export default function LoginScreen() {
  useFonts({
    Poppins_700Bold,
    Poppins_300Light,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <BlueButton text="ENTRAR" color="blue" onPress={() => console.log("Botão Entrar pressionado")} />
      
      <Pressable onPress={() => router.push("/")}> {/* colocar o perfil aqui */}
        <Text style={styles.link}>Voltar para a tela inicial</Text> 
      </Pressable>

         {/* <BlueButton text="Recuperar Senha" color="lightblue" /> */}
              <Pressable onPress={() => router.navigate("/recuperarsenha")}>
                <Text style={styles.link}>Esqueci minha senha</Text>
              </Pressable>         
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