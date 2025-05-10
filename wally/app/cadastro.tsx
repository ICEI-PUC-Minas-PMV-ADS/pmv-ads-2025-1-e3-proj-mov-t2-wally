import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function Cadastro() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text>Nome</Text>
      <TextInput style={styles.input} />

      <Text>Email</Text>
      <TextInput style={styles.input} keyboardType="email-address" />

      <Text>Telefone</Text>
      <TextInput style={styles.input} />

      <Text>Data de Nascimento</Text>
      <TextInput style={styles.input} />

      <Text>Senha</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text>Confirmar Senha</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Button title="Cadastrar" onPress={() => alert("Conta criada!")} />

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.backToLogin}>← Voltar ao Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15
  },
  backToLogin: {
    marginTop: 20,
    color: "blue",
    fontSize: 16
  }
});
