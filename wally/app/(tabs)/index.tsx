import { 
  View, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
  Pressable, 
  ScrollView, 
  StatusBar, 
  SafeAreaView,
  TextInput
} from "react-native";
import { useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function Wallet() {
  const [currentMonth, setCurrentMonth] = useState("Março");
  const saldo = 2346.00;
  const receitas = 12428.00;
  const despesas = 10082.00;

  const formatCurrency = (value) => {
    return `R$${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor="#9ACBD0" 
        barStyle={'dark-content'}
      />
      
      <View style={styles.header} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>

        <View style={styles.cartaoSaldo}>
          <TouchableOpacity 
            style={styles.monthSelector}
            accessible={true}
            accessibilityLabel={`Selecionar mês. Mês atual: ${currentMonth}`}
            accessibilityHint="Toque para mudar o mês"
          >
            <Text style={styles.monthText}>{currentMonth}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.containerSaldo}>
            <Text style={styles.tituloSaldo}>Saldo</Text>
            <Text style={styles.valorSaldo}>{formatCurrency(saldo)}</Text>
          </View>

          <View style={styles.containerResumo}>
            <View style={styles.itemResumo}>
              <View style={styles.linhaTitulo}>
                <SimpleLineIcons name="arrow-up-circle" size={24} color="#249B24" style={styles.icone} />
                <Text style={styles.tituloResumo}>Receitas</Text>
              </View>
              <Text style={styles.valorReceita}>{formatCurrency(receitas)}</Text>
            </View>

            <View style={styles.itemResumo}>
              <View style={styles.linhaTitulo}>
                <SimpleLineIcons name="arrow-down-circle" size={24} color="#EA1919" style={styles.icone} />
                <Text style={styles.tituloResumo}>Despesas</Text>
              </View>
              <Text style={styles.valorDespesa}>{formatCurrency(despesas)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerBotoes}>
          <Pressable 
            style={styles.botaoAdicionar} 
            onPress={() => {}}
            accessible={true}
            accessibilityLabel="Adicionar Receita"
            accessibilityHint="Toque para adicionar uma nova receita"
          >
            <MaterialIcons name="add-circle" size={28} color="#249B24" />
            <Text style={styles.textoAdicionar}>Adicionar Receita</Text>
          </Pressable>
          
          <Pressable 
            style={styles.botaoAdicionar} 
            onPress={() => {}}
            accessible={true}
            accessibilityLabel="Adicionar Despesa"
            accessibilityHint="Toque para adicionar uma nova despesa"
          >
            <MaterialIcons name="add-circle" size={28} color="#EA1919" />
            <Text style={styles.textoAdicionar}>Adicionar Despesa</Text>
          </Pressable>
        </View>

        <View style={styles.barraPesquisa}>
        <MaterialIcons style={styles.iconSearch} name="search" size={20} color="#666" />
        <TextInput
        style={styles.inputSearch}
        placeholder="Filtrar transações..."
        placeholderTextColor="#000"/>
        </View>

      </ScrollView>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  header: {
    backgroundColor: '#9ACBD0',
    height: 120,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 80,

  },
  logo: {
    width: 96,
    height: 96,
    top: 40,
  },
  scrollView: {
    flex: 1,
    marginTop: 80,
  },
  scrollViewContent: {
    paddingTop: 100,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  cartaoSaldo: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: '8%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12%',
  },
  monthText: {
    fontSize: 16,
    color: '#949292',
    marginRight: 5,
  },
  containerSaldo: {
    alignItems: 'center',
    marginBottom: '15%',
  },
  tituloSaldo: {
    fontSize: 16,
    color: '#949292',
    marginBottom: 6,
  },
  valorSaldo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  containerResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemResumo: {
    alignItems: 'center',
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icone: {
    marginRight: 5,
  },
  tituloResumo: {
    fontSize: 16,
    color: '#000',
  },
  valorReceita: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#249B24',
  },
  valorDespesa: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA1919',
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botaoAdicionar: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  textoAdicionar: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
  barraPesquisa: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#fff", 
    padding: 8, 
    borderRadius: 8,
    shadowColor: "#000",          
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  },
  inputSearch: {
    flex: 1,                       
    fontSize: 16,
    color: "#000",
    height: 40,                    
  },
  iconSearch: {
    marginRight: 6, 
    padding: 8,               
  },
});