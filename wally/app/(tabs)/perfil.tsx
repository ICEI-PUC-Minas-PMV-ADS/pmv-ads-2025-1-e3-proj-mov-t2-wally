import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#9ACBD0" barStyle={'dark-content'} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeIcon}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}></Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="add-a-photo" size={48} color="black" style={styles.iconStyle} />
          <Text style={styles.addPhotoText}>Adicionar foto de perfil</Text>
        </View>

        <TextInput 
          style={[styles.inputBox, { marginTop: 6 }]}  
          placeholder="Editar nome"  
        />

        <TextInput 
          style={[styles.inputBox, { marginTop: 15 }]}  
          placeholder="Alterar e-mail"  
        />

        <TextInput 
          style={[styles.inputBox, { marginTop: 15 }]}  
          placeholder="Atualizar celular (00) 0000 0000"  
        />

        <TouchableOpacity style={styles.trashIconContainer}>
          <Ionicons name="trash-bin" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.deleteAccountText}>Excluir conta</Text>

        <TouchableOpacity style={styles.inputButton}>  
          <Text style={styles.buttonText}>Salvar</Text>  
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}> </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#9ACBD0',
    height: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainContent: {
    paddingTop: 140,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
  },
  iconStyle: {
    marginBottom: 100,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#808080',
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    borderColor: 'rgba(72, 166, 167, 1)',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputButton: {
    width: 330,
    height: 52,
    backgroundColor: 'rgba(72, 166, 167, 1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  trashIconContainer: {
    alignItems: 'center',
    marginTop: 100,
  },

  deleteAccountText: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
    marginTop: 5,
  },

  footer: {
    height: 20,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  footerText: {
    fontSize: 12,
    color: '#333',
  },
});
