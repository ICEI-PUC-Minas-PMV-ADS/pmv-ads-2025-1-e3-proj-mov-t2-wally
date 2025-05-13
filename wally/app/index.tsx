import { StyleSheet, View, Text, Image, StatusBar, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useFonts, Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import BlueButton from "@/components/BlueButton";
import Logo from '../assets/images/index_logo.png';
import Bckgd_Image from '../assets/images/index_img.png';
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
    <>
      <StatusBar backgroundColor="#9ACBD0" barStyle="light-content" />
      <View style={styles.greenLine}></View>
      <View style={styles.container}>
        <View>
          <Image source={Logo} style={{ width: 80, height: 80 }} />
          <Text style={styles.logoText}>WALLY</Text>
        </View>
        <Image source={Bckgd_Image} />
        <View>
          <Text style={styles.textTitle}>Simplifique suas finanças!</Text>
          <Text style={styles.textSection}>
            Com sua nova carteira inteligente, gerenciar despesas pessoais e em grupo nunca foi tão fácil - controle tudo de forma fácil e eficiente!
          </Text>
          <BlueButton text="CRIAR CONTA" color="blue" onPress={() => router.navigate("/cadastro")} />
          <BlueButton text="ENTRAR" color="lightblue" onPress={() => router.navigate("/login")} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontSize: 16,
  },
  logoText: {
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    fontSize: 16,
  },
  textTitle: {
    fontWeight: 600,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  textSection: {
    fontFamily: "Poppins_300Light",
    fontSize: 14,
    textAlign: "center",
    width: 310,
    marginBottom: 15
  },
  greenLine: {
    backgroundColor: "#9ACBD0",
    width: "100%",
    height: 80
  }
})
