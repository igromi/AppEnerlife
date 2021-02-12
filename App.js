import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight, I18nManager } from 'react-native';
import { Spinner } from 'native-base';
import ImageLogo from './Img.js'
import ProgressCircle from 'react-native-progress-circle'

export default function App() {
  let [KWH, setKWH] = React.useState('')
  let [pesos, setPesos] = React.useState('')
  let [W, setPotencia] = React.useState('')

  const fetchApiCall = () => {
    fetch("http://iot.enerlife.cl:8000/energia/v1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
      "method": "GET",
    })
      .then(response => response.json())
      .then(response => {
        setKWH(response.KWH);
        setPesos(response.pesos);
      })
      .catch(err => {
        console.log(err);
      });

  fetch("http://iot.enerlife.cl:8000/potencia/v1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
    "method": "GET",
  })
    .then(response => response.json())
    .then(response => {
      setPotencia(response.W);
    })
    .catch(err => {
      console.log(err);
    });

  console.log("test");  
};

  return (
    <View style={styles.container}>
      
      <ImageLogo/>
       
        <ProgressCircle
            percent={Math.round(W/22)}
            radius={80}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{Math.round(W/22)}% Potencia</Text>
        </ProgressCircle>
        
      <View>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Generación Actual: {W} W</Text>
        <Text style={styles.title}>Energía generada del mes: {KWH} KWH</Text>
        <Text style={styles.title}>Ahorro aprox en el mes: ${pesos}</Text>
        <Text style={styles.title}></Text>
      </View>
      <TouchableHighlight onPress={fetchApiCall}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Consultar</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Configurar</Text>
        </View>
      </TouchableHighlight>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#008000'
  },
  title: {
    fontSize: 20,
    color: '#008000'
  },
  button: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingRight:20,
    paddingLeft:20,
    paddingBottom:20,
    backgroundColor:'#FF6600',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color: '#fff'
  }
});