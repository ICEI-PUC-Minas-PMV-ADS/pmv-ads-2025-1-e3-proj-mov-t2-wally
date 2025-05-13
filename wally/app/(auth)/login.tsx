import { StyleSheet, View, Text, TextInput, SafeAreaView, Pressable, TouchableOpacity, Image, StatusBar } from "react-native";
import { useFonts, Poppins_700Bold, Poppins_300Light } from "@expo-google-fonts/poppins";
import { router } from "expo-router";
import { Controller } from "react-hook-form";
import { useLoginViewModel } from "@/viewModels/useLoginViewModel";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function LoginScreen() {
  useFonts({
    Poppins_700Bold,
    Poppins_300Light,
  });

  const { handleSubmitLogin, control } = useLoginViewModel()

  return (
    <>
      <SafeAreaView style={styles.container}>

        <StatusBar backgroundColor="#9ACBD0" barStyle="light-content" />

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

        <View style={styles.mainContent}>

          <Text style={styles.title}>Bem-vindo(a)!</Text>

          <Text style={styles.texto}>E-mail</Text>

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
                autoCapitalize="none" />
            )} />

          <Text style={styles.texto}>Senha</Text>

          <Controller
            control={control}
            name="senha"
            render={({ field }) => (
              <TextInput style={styles.input} value={field.value} placeholder="Senha" onChangeText={field.onChange} secureTextEntry />
            )} />

          <View style={styles.containerBotao}>

            <TouchableOpacity
              style={styles.botaoEntrar}
              onPress={() => { handleSubmitLogin(); }}
              accessible={true}
              accessibilityLabel="Entrar"
              accessibilityHint="Toque para entrar na sua conta"
              accessibilityRole="button">
              <Text style={styles.textoBotao}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSenha}
              onPress={() => router.push("/recuperarsenha")}
              accessible={true}
              accessibilityLabel="Esqueci minha senha"
              accessibilityHint="Toque para redefinir senha e recuperar o acesso"
              accessibilityRole="button">
              <Text style={styles.textoBotaoSenha}>ESQUECI MINHA SENHA</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView></>
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
    left: 16,
    top: 46,
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 26,
    marginTop: 26,
    fontFamily: "Poppins_700Bold",
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
  botaoEntrar: {
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