import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@env';
import { useAuthStore } from '@/store/authStore';

type StatusGrupo = {
  data: string
  emprestou: boolean
  envolvido: boolean
  nome: string
  usuario_id: string
  valor_pego_emprestado: number | null
  valor_total: number
}

export default function GrupoScreen() {
  const { id } = useLocalSearchParams()

  const router = useRouter();

  const token = useAuthStore((state) => state.token)
  const usuario = useAuthStore((state) => state.user)

  const { data: statusGrupo, isPending: isLoadingStatusGrupo, refetch: refetchStatusGrupo } = useQuery<StatusGrupo[]>({
    queryKey: ['statusGrupo', id],
    queryFn: async () => {
      console.log({ url: `/status/grupo?grupo_id=${id}&usuario_id=${usuario?.id}` })
      const response = await fetch(`${API_URL}/status/grupo?grupo_id=${id}&usuario_id=${usuario?.id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      })
      return response.json()
    },
    enabled: !!token && !!usuario,
  })


  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackVisible: true,
          headerBackTitle: 'Voltar',
          headerTintColor: '#006A71',
          headerStyle: { backgroundColor: '#F4F2F2' },
        }} />

      <SafeAreaView style={styles.container}>

        <View style={styles.header} />

        <View style={styles.mainContent}>

          <Text style={styles.titulo}>Viagem Praia 🏝️</Text>
          <Text style={styles.subTitulo}>Você deve R$2.345,26</Text>

          <View style={styles.containerBotoes}>
            <TouchableOpacity
              style={styles.botaoQuitar}
              onPress={() => ("")}
              accessible={true}
              accessibilityLabel="Adicionar Despesa"
              accessibilityHint="Toque para adicionar uma nova despesa no grupo"
              activeOpacity={0.7}
            >
              <View style={styles.botaoIconeContainer}>
                <MaterialIcons name="add" size={20} color="#000" />
              </View>
              <Text style={styles.textoBotaoQuitar}>QUITAR CONTAS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={() => router.push({ pathname: '/add-despesa', params: { grupoId: id } })}
              accessible={true}
              accessibilityLabel="Adicionar Despesa"
              accessibilityHint="Toque para adicionar uma nova despesa no grupo"
              activeOpacity={0.7}
            >
              <View style={styles.botaoIconeContainer}>
                <MaterialIcons name="add" size={20} color="#fff" />
              </View>
              <Text style={styles.textoBotao}>ADICIONAR DESPESA</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.tituloLista}>Maio 2025</Text>

          <FlatList
            data={statusGrupo}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemTexto}>{item.nome}</Text>
                <Text style={styles.itemTextoValor}>{item.valor_total}</Text>
                <Text style={styles.itemTextoValor}>{item.usuario_id}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
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
  header: {
    backgroundColor: '#9ACBD0',
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    paddingHorizontal: 30,
  },
  titulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 36,
  },
  subTitulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 46,
    marginTop: 6,
  },
  tituloLista: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    marginBottom: 6,
    marginTop: 6,
    padding: 8,
  },
  item: {
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemTexto: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#000',
    padding: 10,
  },
  itemTextoValor: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#000',
    padding: 10,
  },
  containerBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  botaoAdicionar: {
    backgroundColor: "#48A6A7",
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  botaoQuitar: {
    backgroundColor: "#ffff",
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  botaoIconeContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    fontFamily: "Poppins_300Light",
    fontSize: 14,
    color: "#ffff",
  },
  textoBotaoQuitar: {
    fontFamily: "Poppins_300Light",
    fontSize: 14,
    color: "#000",
  },
})