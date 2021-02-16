import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {TextInput, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import ImageLogo from './Img.js'
import ProgressCircle from 'react-native-progress-circle'

export default function App() {
  let [KWH, setKWH] = React.useState('')
  let [W, setPotencia] = React.useState('')
  const [valueText, onChangeText] = React.useState('');

  const fetchApiCall = () => {
    fetch("http://iot.enerlife.cl:8000/v1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9?id="+valueText+"&var=KWH", {
      "method": "GET",
    })
      .then(response => response.json())
      .then(response => {
        setKWH(response.KWH);
      })
      .catch(err => {
        console.log(err);
      });

  fetch("http://iot.enerlife.cl:8000/v1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9?id="+valueText+"&var=W", {
    "method": "GET",
  })
    .then(response => response.json())
    .then(response => {
      setPotencia(response.W);
    })
    .catch(err => {
      console.log(err);
    });

  console.log("test")  
};

  return (
    <View style={styles.container}>
      
      <ImageLogo/>
       
      <View style={styles.container2}>
        <ProgressCircle 
            percent={Math.round(W/10)}
            radius={60}
            borderWidth={5}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
          <View>
            <Text style={{ fontSize: 16 }}>{W} W </Text>
            </View>
        </ProgressCircle>
        <Text style={styles.buttonText}>""</Text>
        <ProgressCircle
            percent={Math.round(KWH/2.4)}
            radius={60}
            borderWidth={5}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
      
          <View>
            <Text style={{ fontSize: 16 }}>{KWH} KWH</Text>
            </View>
        </ProgressCircle>
        <Text style={styles.buttonText}>""</Text>
        <ProgressCircle
            percent={Math.round((Math.round(KWH*150))/360)}
            radius={60}
            borderWidth={5}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
     
          <View>
            <Text style={{ fontSize: 16 }}> ${Math.round(KWH*150)}</Text>
            </View>
        </ProgressCircle>
        </View>  
      <View>
     
    
        <Text style={styles.title}>Generación Actual: {W} W</Text>
        <Text style={styles.title}>Energía generada del mes: {KWH} KWH</Text>
        <Text style={styles.title}>Ahorro aprox en el mes: ${Math.round(KWH*150)}</Text>
        <Text style={styles.title}></Text>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => onChangeText(text)}
          valueText={valueText}
      />
      </View>
      <View style={styles.container2}> 
      <TouchableHighlight onPress={fetchApiCall}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Consultar </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Configurar</Text>
        </View>
      </TouchableHighlight>
      </View>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#008000',
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    paddingBottom:5,
  },
  container2:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#008000',
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    paddingBottom:5, 
  },
  title: {
    fontSize: 16,
    color: '#008000'
  },
  circulo:
  {
    marginRight:5,
    marginLeft:5,

  },
  button: {
    marginRight:15,
    marginLeft:15,
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