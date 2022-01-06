import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
  SegmentedControlIOS
} from 'react-native';

import { Formulario } from './components/Formulario';
import { Clima } from './components/Clima';


const App = () => {
  
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais:''
  });

  const [consultar, setConsultar]= useState(false);
  const [guardarResultado, setGuardarResultado]= useState({});
  const [bgcolor, setBgColor]= useState('#62EFFA')

  const { ciudad, pais} = busqueda
  useEffect(() => {
    const consultarClimaAPI=async ()=>{
      if(consultar){
        const apiKey = '82cdea01e51b1c05cd03edf56fb9341c'
        const url= `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
       try {
         const respuesta = await fetch(url);
         const resultado = await respuesta.json();
         setGuardarResultado(resultado)
         setConsultar(false); // hay que cambiarlo para hacer nuevas consultas

         //modifica los colores de fondo basados en la temperatura
         const kelvin = 273.15;
         const { main } = resultado;
         const actual = main.temp - kelvin;

         if(actual<10){
          setBgColor('#2358A6')
         }else if(actual>=10 && actual< 25){
          setBgColor('#62EFFA')
         }else{
          setBgColor('#E66B00')
         }

       } catch (error) {
         mostrarAlerta();
         console.log(error)
       }
      }
    }
    consultarClimaAPI();
  }, [consultar])

  const mostrarAlerta=()=>{
    Alert.alert('Error','No se encontro resultado',[{text:'Aceptar'}])
}


  const ocultarTeclado = ()=>{
    Keyboard.dismiss();
  }

  const bgColorFondo={
    backgroundColor:bgcolor
  }


  return (
    <>
    <TouchableWithoutFeedback onPress={ ocultarTeclado }>
      <View style={[styles.app, bgColorFondo]}>
        <View style={styles.contenido}>
          <Clima
            guardarResultado={ guardarResultado }
          />
          <Formulario 
            busqueda={ busqueda }
            setBusqueda={ setBusqueda}
            setConsultar={ setConsultar }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app:{
    flex: 1,
    justifyContent: 'center'
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
