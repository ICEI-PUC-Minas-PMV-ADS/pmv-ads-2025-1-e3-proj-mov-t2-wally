import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '@env';
import { useAuthStore } from '@/store/authStore';
import { Controller, useForm } from 'react-hook-form';

interface Despesa {
  valor: string;
  data: string;
  nome: string;
}

export default function AdicionarDespesaGrupo() {
  const { grupoId } = useLocalSearchParams()
  console.log({ grupoId })

  const token = useAuthStore((state) => state.token)
  const usuario = useAuthStore((state) => state.user)

  const { mutateAsync: criarDespesa } = useMutation({
    mutationFn: async (despesa: any) => {
      console.log({url: `${API_URL}/despesas-grupo`, despesa})
      const response = await fetch(`${API_URL}/despesas-grupo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(despesa)
      })

      if (!response.ok) {
        throw new Error('Erro ao criar despesa')
      }

      router.back()
    }
  })

  const form = useForm<Despesa>({
    defaultValues: {
      valor: '',
      data: '',
      nome: '',
    }
  })

  const handleSubmitDespesaGrupo = useCallback(form.handleSubmit(async (data) => {
    try {
      if (usuario && grupoId) {
        console.log(data)
        //await criarDespesa(data)

        const usuarioId = usuario.id

        await criarDespesa({
          nome: data.nome,
          valor: Number(data.valor),
          usuario_id: usuarioId,
          grupo_id: grupoId,
          membros_participantes: [usuarioId]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }), [criarDespesa])

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


          <Text style={styles.labelNome}>Você pagou:</Text>
          <Controller
            control={form.control}
            name="valor"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="Valor"
                value={field.value.toString()}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={form.control}
            name="data"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="Data"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={form.control}
            name="nome"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="Nome da Despesa"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Text style={styles.labelNome}>Dividir por todos:</Text>

          <TouchableOpacity
            style={styles.botaoCriar}
            accessible={true}
            accessibilityLabel="Salvar"
            accessibilityHint="Toque para salvar despesa"
            accessibilityRole="button"
            onPress={handleSubmitDespesaGrupo}>
            <Text style={styles.textoBotao}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
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
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  labelNome: {
    fontFamily: 'Inter',
    padding: 8,
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    marginTop: 56,
  },
  labelTipo: {
    fontFamily: 'Inter',
    padding: 8,
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    marginTop: 40,
  },
  tiposContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipoItem: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  tipoItemSelecionado: {
    borderColor: '#48A6A7',
    borderWidth: 2,
  },
  containerBotao: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 60,
    zIndex: 3,
  },
  botaoAddmebro: {
    width: 330,
    height: 52,
    backgroundColor: '#48A6A7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCriar: {
    width: 330,
    height: 52,
    marginTop: 20,
    backgroundColor: '#006A71',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
});