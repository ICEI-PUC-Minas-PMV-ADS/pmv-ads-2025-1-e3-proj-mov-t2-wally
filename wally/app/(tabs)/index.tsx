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
  Platform
} from "react-native";
import React from "react";
import { useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Button, Dialog, Portal, PaperProvider,TextInput,} from 'react-native-paper';
import DatePicker from "@react-native-community/datetimepicker";

export default function Wallet() {
  const [currentMonth, setCurrentMonth] = useState("Março");
  const saldo = 2346.00;
  const receitas = 12428.00;
  const despesas = 10082.00;

  const [visible_receita, setVisible_receita] = React.useState(false);
  const [visible_despesa, setVisible_despesa] = React.useState(false);



  const showDialog_receita = () => setVisible_receita(true);

  const hideDialog_receita = () => setVisible_receita(false);

  const showDialog_despesa = () => setVisible_despesa(true);

  const hideDialog_despesa = () => setVisible_despesa(false);

  const [data_receita,setData_receita]=React.useState(new Date());
  const [data_despesa,setData_despesa]=React.useState(new Date());
  const [data_da_receita,setData_da_receita]=React.useState("")
  const [data_da_despesa,setData_da_despesa]=React.useState("")
  

  const [valor_receita,setValor_receita]=React.useState("");
  const [valor_despesa,setValor_despesa]=React.useState("");
  const [todas_despeas,setTodas_despesas]=React.useState("");

  const [descricao_receita, setDescricao_receita] =React.useState('');
  const [descricao_despesa, setDescricao_despesa] =React.useState('');

  const [total_receita,setTotal_receita]=React.useState(0.0)
  const [total_despesa,setTotal_despesa]=React.useState(0.0)

  

  const [showPicker,setShowPicker]=React.useState(false);

  const toggleDataPicker= () =>{
    setShowPicker(!showPicker);
  };

  const formatarDataCompleta = (data) => {
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  

  const onChange = ({type},selectedDate) =>{
    if(type=='set'){
      const currentDate = selectedDate;
      setData_receita(currentDate);
      setData_despesa(currentDate);
      if(Platform.OS==="android"){
        toggleDataPicker();
        setData_da_receita(formatarDataCompleta(currentDate));
        setData_da_despesa(formatarDataCompleta(currentDate));
      }
      else{
        toggleDataPicker();
      }

    }
    else{
      toggleDataPicker();
    }

  }


  const formatCurrency = (value) => {
    return `R$${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <PaperProvider>
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
            onPress={showDialog_receita}
            accessible={true}
            accessibilityLabel="Adicionar Receita"
            accessibilityHint="Toque para adicionar uma nova receita"
            
          >
            <MaterialIcons name="add-circle" size={28} color="#249B24" />
            <Text style={styles.textoAdicionar}>Adicionar Receita</Text>
          </Pressable>
          <Portal>
          <Dialog visible={visible_receita} onDismiss={hideDialog_receita}>
            <View style={styles.view_teste} >
              
              <MaterialIcons name="add-circle" size={28} color="#249B24" />
            <Text style={styles.textoAdicionar}>Adicionar Receita</Text>
            </View>
            <Dialog.Content>
             <View style={styles.view_dialog}>
              <TextInput style={styles.dialog_input_despesa}
              label='Valor '
              keyboardType='decimal-pad'
              value={valor_receita}
              onChangeText={setValor_receita}>
              

              </TextInput>

               {showPicker &&( <DatePicker 
                mode='date'
                display='spinner'
                value={data_receita}
                onChange={onChange}
                minimumDate={new Date('2025-1-1')}
                maximumDate={new Date('2025-12-31')}>

                </DatePicker>)}
                {!showPicker &&(
              <Pressable onPress={toggleDataPicker}>
              <TextInput style={styles.input_dialog_date}
              placeholder='Data'
              value={data_da_receita}
              onChangeText={setData_da_receita}
              editable={false}
             >

              </TextInput>
              </Pressable>
            )}
                
             </View>
             <View style={styles.view_dialog_input}>
             <TextInput  
             style={styles.input_dialog}
             label="Descrição (opcional)"
             value={descricao_receita}
             onChangeText={setDescricao_receita}>
              
             </TextInput>
             <Button  style={styles.button_dialog}
             mode='contained'
             onPress={() => {
              const receita = parseFloat(valor_receita) || 0;
              const despesa = parseFloat(valor_despesa) || 0;
              const nova_receita = total_receita + receita
              setTotal_receita (nova_receita) 
              setValor_receita("");
              
              
              hideDialog_receita();
            }}
            >ADICIONAR</Button>
             </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog_receita}>Fechar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
          
          <Pressable 
            style={styles.botaoAdicionar} 
            onPress={showDialog_despesa}
            accessible={true}
            accessibilityLabel="Adicionar Despesa"
            accessibilityHint="Toque para adicionar uma nova despesa"
          >
            <MaterialIcons name="add-circle" size={28} color="#EA1919" />
            <Text style={styles.textoAdicionar}>Adicionar Despesa</Text>
          </Pressable>
          <Portal>
          <Dialog visible={visible_despesa} onDismiss={hideDialog_despesa}>
            <View style={styles.view_teste}>
              
               <MaterialIcons name="add-circle" size={28} color="#EA1919" />
            <Text style={styles.textoAdicionar}>Adicionar Despesa</Text>
            </View>
            <Dialog.Content>
             <View style={styles.view_dialog}>
              <TextInput
              style={styles.dialog_input_despesa}
              label='Valor '
              keyboardType='decimal-pad'
              value={valor_despesa}
              onChangeText={setValor_despesa}>
              

              </TextInput>

               {showPicker &&( <DatePicker 
                mode='date'
                display='spinner'
                value={data_despesa}
                onChange={onChange}
                minimumDate={new Date('2025-1-1')}
                maximumDate={new Date('2025-12-31')}>

                </DatePicker>)}
                {!showPicker &&(
              <Pressable onPress={toggleDataPicker}>
              <TextInput style={styles.input_dialog_date}
              placeholder='Data'
              value={data_da_despesa}
              onChangeText={setData_da_despesa}
              editable={false}
             >

              </TextInput>
              </Pressable>
            )}
                
             </View>
             <View style={styles.view_dialog_input}>
             <TextInput 
             style={styles.input_dialog}
             label="Descrição (opcional)"
             value={descricao_despesa}
             onChangeText={setDescricao_despesa}>
              
             </TextInput>
             <Button  style={styles.button_dialog}
             mode='contained'
             onPress={() => {
              const despesa = parseFloat(valor_despesa) || 0;

              const novo_total_despesa = total_despesa + despesa;
              setTotal_despesa(novo_total_despesa);
             
              setTodas_despesas(valor_despesa);
              setValor_despesa("");
              hideDialog_despesa();
            }}
            >ADICIONAR</Button>
             </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog_despesa}>Fechar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
          
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
    </PaperProvider>
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
    top: 80,
  },
  scrollView: {
    flex: 1,
    marginTop: 90,
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
    marginTop: 40,
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
  dialog_input_despesa:{
    backgroundColor:"white",
    borderRadius:10,
    width:125,

    
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
    backgroundColor:"white"                    
  },
  iconSearch: {
    marginRight: 6, 
    padding: 8,               
  },
  //Inicio estevão

  
  imagem: {
    marginBottom: 16,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  card: {
    backgroundColor: "white",
    width: '90%',
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  texto2: {
    fontSize: 26,
  },
  containerCardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  cardButton: {
    width: '40%',
    height: 180,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  button_receita: {
    height: 45,
    borderRadius: 100, 
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  button_despesa: {
    backgroundColor: "red",
    height: 45,
    borderRadius: 100, 
    justifyContent: 'center',
  },
  texto_button: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    
  },
  texto_button_card:{
    color:'white',
    fontSize:20,
  },
  view_dialog_image:{
    justifyContent:"center",
    alignItems:"center",
  },
  imagem_dialog:{
    width:50,
    height:50,
    },
    view_dialog:{
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'center',
      gap:16,
      width:"auto"
      
    },
    input_dialog:{
      
      width:"85%",
      borderRadius:10,
      backgroundColor:"white"
    },
    view_dialog_input:{
      
      justifyContent:'center',
      alignItems:'center',
      padding:10,
      
    },
    button_dialog:{
      marginTop:10,
      backgroundColor:"#006A71",
      borderRadius:5
    },
    input_dialog_date:{
      width:125,
      backgroundColor:"white",
      borderRadius:10,
      
    },
    view_despesa_receita:{
      flexDirection:"row",
      justifyContent:"space-evenly"

    },
    view_capeta:{
      flexDirection:"column",
      justifyContent:"flex-start"
    },
    view_teste:{
      justifyContent:"center",
      alignItems:"center",
      marginBottom:10
    }


});