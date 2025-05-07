import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function Wallet() {
  const [currentMonth, setCurrentMonth] = useState("Março");
  const saldo = 2346.00;
  const receitas = 12428.00;
  const despesas = 10082.00;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.cartaoSaldo}>
        <TouchableOpacity style={styles.monthSelector}>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.containerSaldo}>
          <Text style={styles.tituloSaldo}>Saldo</Text>
          <Text style={styles.valorSaldo}>R${saldo.toFixed(2).replace('.', ',')}</Text>
        </View>

        <View style={styles.containerResumo}>
          <View style={styles.itemResumo}>
            <View style={styles.linhaTitulo}>
              <SimpleLineIcons name="arrow-up-circle" size={24} color="#249B24" style={styles.icone} />
              <Text style={styles.tituloResumo}>Receitas</Text>
            </View>
            <Text style={styles.valorReceita}>R${receitas.toFixed(2).replace('.', ',')}</Text>
          </View>

          <View style={styles.itemResumo}>
            <View style={styles.linhaTitulo}>
              <SimpleLineIcons name="arrow-down-circle" size={24} color="#EA1919" style={styles.icone} />
              <Text style={styles.tituloResumo}>Despesas</Text>
            </View>
            <Text style={styles.valorDespesa}>R${despesas.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2F2',
  },
  header: {
    backgroundColor: '#9ACBD0',
    height: 100,
    paddingTop: 60,
  },
  logo: {
    width: 96,
    height: 96,
    marginTop: 80,
    alignSelf: 'center',
  },
  cartaoSaldo: {
    backgroundColor: '#ffff',
    borderRadius: 8,
    margin: 16,
    marginTop: 180,
    padding: 36,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 46,
  },
  monthText: {
    fontSize: 16,
    color: '#949292',
    marginRight: 5,
  },
  containerSaldo: {
    alignItems: 'center',
    marginBottom: 60,
  },
  tituloSaldo: {
    fontSize: 16,
    color: '#949292',
    marginBottom: 6,
  },
  valorSaldo: {
    fontSize: 20,
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
});
