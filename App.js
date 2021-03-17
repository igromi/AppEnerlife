import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {TextInput, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import ImageLogo from './Img.js'
import ProgressCircle from 'react-native-progress-circle'

export default function App() {
  let [KWH, setKWH] = React.useState('')
  let [W, setPotencia] = React.useState('')
  let [KWHxD, setKWHxD] = React.useState('')
  const [valueText, onChangeText] = React.useState('');

  //lamadas a las API , se pasa como parametro la variable a rescatar y trae el ultimo valor , tambien se cosidera el formato VAR+ID

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
      
    fetch("http://iot.enerlife.cl:8000/v1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9?id="+valueText+"&var=KWHxD", {
        "method": "GET",
        })
        .then(response => response.json())
        .then(response => {
          setKWHxD(response.KWHxD);
        })
        .catch(err => {
          console.log(err);
        });
        <Text style={styles.title}>Generado en pesos del día: ${parseFloat(KWHxD*150).toFixed(0)}</Text>
};

  return (
    <View style={styles.container}>
      
      <ImageLogo/>
       
      <View style={styles.container2}>

        <ProgressCircle 
            percent={Math.round(W/10)}
            radius={55}
            borderWidth={5}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <View>
                <Text style={{ fontSize: 16 }}>{W} W</Text>
            </View>
        </ProgressCircle>
        <Text style={styles.buttonText}>""</Text>

        <ProgressCircle
            percent={Math.round(W/20)}
            radius={55}
            borderWidth={5}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
             >
            <View>
                <Text style={{ fontSize: 16 }}>{Math.round(W/20)}%</Text>
            </View>
        </ProgressCircle>
        </View>
      
        <View>
          <Text style={styles.title}></Text>
          <Text style={styles.title}>Potencia Actual: {W} W</Text>
          <Text style={styles.title}>Eficiencia: {Math.round(W/20)}%</Text>
          <Text style={styles.title}></Text>
        </View>
        
      <View style={styles.container2}>

        <ProgressCircle 
              percent={Math.round(KWHxD*10)}
              radius={55}
              borderWidth={5}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
          >
              <View>
                  <Text style={{ fontSize: 16 }}>{parseFloat(KWHxD).toFixed(2)} KWH</Text>
              </View>
          </ProgressCircle>
          <Text style={styles.buttonText}>""</Text>

          <ProgressCircle
              percent={Math.round(KWH/100)}
              radius={55}
              borderWidth={5}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
              >
              <View>
                  <Text style={{ fontSize: 16 }}>{KWH} KWH</Text>
              </View>
          </ProgressCircle>

      </View>
      <View>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Generación del día: {parseFloat(KWHxD).toFixed(2)} KWH</Text>
        <Text style={styles.title}>Energía generada total: {KWH} KWH</Text>
        <Text style={styles.title}></Text>
      </View>

      <View style={styles.container2}>

        <ProgressCircle 
              percent={parseFloat(KWHxD*150).toFixed(0)/100}
              radius={55}
              borderWidth={5}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
          >
              <View>
                  <Text style={{ fontSize: 16 }}>${parseFloat(KWHxD*150).toFixed(0)}</Text>
              </View>
          </ProgressCircle>
          <Text style={styles.buttonText}>""</Text>

          <ProgressCircle
              percent={Math.round(KWH*150)/10000}
              radius={55}
              borderWidth={5}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
              >
              <View>
                  <Text style={{ fontSize: 16 }}>${Math.round(KWH*150)}</Text>
              </View>
          </ProgressCircle>

        </View>

      <View>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Beneficio en pesos del día: ${parseFloat(KWHxD*150).toFixed(0)}</Text>
        <Text style={styles.title}>Beneficio en pesos total: ${Math.round(KWH*150)}</Text>
        <Text style={styles.title}></Text>
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