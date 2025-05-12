import React, { useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import BlueButton from "@/components/BlueButton";
import { useCadastroViewModel } from "@/viewModels/useCadastroViewModel";

export default function Cadastro() {
  const { handleSubmitCadastro, control } = useCadastroViewModel()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Text>Nome</Text>
      <Controller
        control={control}
        name="nome"
        render={({ field }) => (
          <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} />
        )}
      />

      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} keyboardType="email-address" />
        )}
      />

      <Text>Telefone</Text>
      <Controller
        control={control}
        name="telefone"
        render={({ field }) => (
          <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} />
        )}
      />

      <Text>Data de Nascimento</Text>
      <Controller
        control={control}
        name="dataNascimento"
        render={({ field }) => (
          <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} />
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

      <Text>Confirmar Senha</Text>
      <Controller
        control={control}
        name="confirmarSenha"
        render={({ field }) => (
          <TextInput style={styles.input} value={field.value} onChangeText={field.onChange} secureTextEntry />
        )}
      />

      <BlueButton text="Cadastrar" color="blue" onPress={() => {
        
        handleSubmitCadastro()
      }} />

      <BlueButton text="← Voltar ao Login" color="lightblue" onPress={() => router.push("/login")} />
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
