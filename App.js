import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function App() {
  let [KWH, setKWH] = React.useState('')
  const fetchApiCall = () => {
    fetch("http://iot.enerlife.cl:8000/energia/v1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
      "method": "GET",
    })
      .then(response => response.json())
      .then(response => {
        setKWH(response.KWH);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enerlife App</Text>
      <TouchableHighlight onPress={fetchApiCall}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Consultar</Text>
        </View>
      </TouchableHighlight>
      <View>
        <Text>Energía generada del mes: {KWH}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  title: {
    fontSize: 35,
    color: '#fff'
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#0645AD'
  },
  buttonText: {
    color: '#fff'
  }
});