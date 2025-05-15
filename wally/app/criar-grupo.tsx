import { View, StyleSheet, StatusBar, Text, SafeAreaView, TextInput, Pressable } from "react-native"
import { useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useGruposViewModel } from "@/viewModels/useGruposViewModel"
import { Controller } from "react-hook-form"
import { router } from "expo-router"

export default function CriarGrupoScreen() {
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null)

  const tiposGrupo = [
    { id: "viagem", icon: "airplane-outline", label: "Viagem", component: Ionicons },
    { id: "casa", icon: "home-outline", label: "Casa", component: Ionicons },
    { id: "trabalho", icon: "briefcase-outline", label: "Trabalho", component: Ionicons },
    { id: "outro", icon: "list-outline", label: "Outro", component: Ionicons },
  ]

  const { grupoForm } = useGruposViewModel()

  return (
    <>
      <SafeAreaView style={styles.container}>

        <StatusBar backgroundColor="#9ACBD0" barStyle="light-content" />

        <View style={styles.botaoVoltar}>

          <Pressable
            onPress={() => router.push('/(tabs)/grupos')}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#006A71" />
          </Pressable>

        </View>

        <View style={styles.addPhoto}>
          <MaterialIcons name="add-a-photo" size={56} color="#006A71" />
        </View>

        <Text style={styles.addPhotoText}>Atualizar foto de perfil</Text>

        <View style={styles.mainContent}>

          <Text style={styles.labelNome}>Nome do Grupo</Text>

          <Controller
            control={grupoForm.control}
            name="nome"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="Nome do Grupo"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Text style={styles.labelTipo}>Tipo</Text>

          <Controller
            control={grupoForm.control}
            name="descricao"
            render={({ field }) => (
              <View style={styles.tiposContainer}>
                {tiposGrupo.map((tipo) => {
                  const IconComponent = tipo.component
                  return (
                    <View key={tipo.id} style={styles.tipoWrapper}>
                      <Pressable
                        style={[styles.tipoItem, tipoSelecionado === tipo.id && styles.tipoItemSelecionado]}
                        onPress={() => {
                          setTipoSelecionado(tipo.id)
                          field.onChange(tipo.id)
                        }}
                      >
                        <IconComponent name={tipo.icon as any} size={28} color="#48A6A7" />
                      </Pressable>
                      <Text style={styles.tipoLabel}>{tipo.label}</Text>
                    </View>
                  )
                })}
              </View>
            )}
          />
        </View>

        <View style={styles.containerBotao}>
          <Pressable
            style={styles.botaoAddmebro}
            accessible={true}
            accessibilityLabel="Adicionar membro"
            accessibilityHint="Toque para adicionar um novo membro ao grupo"
            accessibilityRole="button"
          >
            <MaterialIcons name="group-add" size={28} color="#fff" />
            <Text style={styles.textoBotaoAddmebro}>ADICIONAR MEMBROS</Text>
          </Pressable>

          <Pressable
            style={styles.botaoCriar}
            onPress={() => router.push("/grupo")}
            accessible={true}
            accessibilityLabel="Criar grupo"
            accessibilityHint="Toque para criar um novo grupo"
            accessibilityRole="button"
          >
            <Text style={styles.textoBotao}>CRIAR</Text>
          </Pressable>

        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F2F2",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    margin: 8,
  },
  botaoVoltar: {
    position: 'absolute',
    left: 8,
    padding: 16,
  },
  addPhoto: {
    alignSelf: "center",
    marginTop: 56,
  },
  addPhotoText: {
    fontFamily: "Poppins_300Light",
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginTop: 6,
    marginBottom: 10,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: "#fff",
    fontFamily: "Inter",
  },
  labelNome: {
    fontFamily: "Poppins_300Light",
    padding: 8,
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
    marginTop: 30,
  },
  labelTipo: {
    fontFamily: "Poppins_300Light",
    padding: 8,
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
    marginTop: 8,
  },
  tiposContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tipoItem: {
    width: 76,
    height: 76,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 5,
  },
  tipoItemSelecionado: {
    borderColor: "#48A6A7",
    borderWidth: 2,
  },
  containerBotao: {
    alignItems: "center",
    padding: 10,
    marginBottom: 60,
    zIndex: 3,
  },
  botaoAddmebro: {
    width: 330,
    height: 52,
    backgroundColor: "#48A6A7",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  botaoCriar: {
    width: 330,
    height: 52,
    marginTop: 8,
    backgroundColor: "#006A71",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotaoAddmebro: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  tipoWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  tipoLabel: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    color: "#00494E",
    marginTop: 4,
    textAlign: "center",
  },
})
