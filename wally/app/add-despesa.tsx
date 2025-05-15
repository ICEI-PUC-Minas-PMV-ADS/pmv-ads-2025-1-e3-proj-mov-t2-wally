import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '@env';
import { useAuthStore } from '@/store/authStore';
import { Controller, useForm } from 'react-hook-form';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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
      console.log({ url: `${API_URL}/despesas-grupo`, despesa })
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

      <SafeAreaView style={styles.container}>

        <StatusBar backgroundColor="#9ACBD0" barStyle="light-content" />

        <View style={styles.botaoVoltar}>

          <Pressable
            onPress={() => router.push('/grupo')}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#006A71" />
          </Pressable>

        </View>

        <View style={styles.mainContent}>

          <Text style={styles.titulo}>Viagem Praia 🏝️</Text>

          <Text style={styles.tituloDois}>Você pagou:</Text>

          <Text style={styles.labelNome}>Valor</Text>
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

          <Text style={styles.labelNome}>Data</Text>
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

          <Text style={styles.labelNome}>Nome da Despesa</Text>
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

          <Text style={styles.labelDivisao}>Dividir por todos:</Text>

          <TouchableOpacity
            style={styles.botaoSalvar}
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
  botaoVoltar: {
    position: 'absolute',
    left: 8,
    padding: 16,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    margin: 8,
  },
  titulo: {
    fontFamily: 'Poppins_300Light',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 56,
  },
  tituloDois: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 26,
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
    marginTop: 6,
  },
  labelDivisao: {
    fontFamily: "Poppins_300Light",
    padding: 8,
    fontSize: 14,
    color: "#777",
    marginBottom: 26,
    marginTop: 6,
  },
  botaoSalvar: {
    width: 330,
    height: 52,
    marginTop: 76,
    backgroundColor: '#006A71',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3.6,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});