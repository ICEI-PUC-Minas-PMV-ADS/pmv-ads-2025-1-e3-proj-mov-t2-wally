import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Stack } from 'expo-router';
import { useFonts, Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import { router } from "expo-router";

import { useAuthStore } from "@/store/authStore";

export default function HomeScreen() {
  useFonts({
    Poppins_700Bold,
    Poppins_300Light
  });

  const restoreSession = useAuthStore((s) => s.restoreSession);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    restoreSession();
  }, []);

  useEffect(() => {
    if (isHydrated && token) {
      router.replace("/(tabs)");
    }
  }, [isHydrated, token]);

  if (!isHydrated) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }

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
          source={require('../assets/images/index_logo.png')}
          style={styles.logo}
          resizeMode="contain" />
        <Text style={styles.logoText}>WALLY</Text>
        <Image
          source={require('../assets/images/index_img.png')}
          style={styles.imgInicial}
          resizeMode="contain" />
      </View>

      <Text style={styles.textTitle}>Simplifique suas finanças!</Text>

      <Text style={styles.textSection}>
        Com sua nova <Text style={{ color: '#00494E' }}>carteira inteligente</Text>, <Text style={{ color: '#00494E' }}>gerenciar</Text> despesas pessoais e em grupo nunca foi tão fácil - controle tudo de forma <Text style={{ color: '#00494E' }}>fácil</Text> e <Text style={{ color: '#00494E' }}>eficiente!</Text>
      </Text>

      <View style={styles.containerBotao}>
        <TouchableOpacity
          style={styles.botaoCriar}
          onPress={() => router.navigate("/cadastro")}
          accessible={true}
          accessibilityLabel="Criar conta"
          accessibilityHint="Toque para se cadastrar"
          accessibilityRole="button">
          <Text style={styles.textoBotao}>CRIAR CONTA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => router.navigate("/login")}
          accessible={true}
          accessibilityLabel="Entrar"
          accessibilityHint="Toque para entrar na sua conta"
          accessibilityRole="button">
          <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

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
    zIndex: 2,
  },
  logo: {
    width: 66,
    height: 66,
    alignSelf: 'center',
    marginTop: 26,
  },
  imgInicial: {
    width: 236,
    height: 236,
    alignSelf: 'center',
    marginTop: 26,
  },
  logoText: {
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    fontSize: 16,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
    color: '#00494E',
    marginTop: 16,
  },
  textSection: {
    width: 300,
    fontFamily: "Poppins_300Light",
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#777',
  },
  botaoCriar: {
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
  },
  botaoEntrar: {
    width: 330,
    height: 52,
    backgroundColor: '#9ACBD0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  containerBotao: {
    alignItems: 'center',
  },
});
