import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { transform } from '@babel/core';

export const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

    const [ animacionBoton ]=useState( new Animated.Value(1) );
    const{ pais,ciudad }= busqueda

    const consultarClima = ()=>{
        if(pais.trim()===''|| ciudad.trim()===''){
            mostrarAlerta();
            return;
        }
        setConsultar(true);
    }

    const mostrarAlerta=()=>{
        Alert.alert('Error','Ambos campos son necesarios',[{text:'Entendido'}])
    }
    //ANIMACIONES       
    const animacionEntrada = ()=>{
        //presiona el boton
        Animated.spring( animacionBoton,{
            toValue: .75,
            useNativeDriver: true,
        } ).start();
    }
    const animacionSalida = ()=>{
        Animated.spring( animacionBoton,{
            toValue: 1,
            friction:2,
            tension:30,
            useNativeDriver: true,
        } ).start();
    }

    const estiloAnimacion={
        transform: [{ scale: animacionBoton }]
    }

    return (
        <>
         <View style={StyleSheet.formulario}> 
                <View>
                    <TextInput 
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad=>setBusqueda({...busqueda,ciudad})}
                        placeholder='Ciudad'
                        placeholderTextColor='#B1C4BF'
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        onValueChange={pais=>setBusqueda({...busqueda,pais})}
                        itemStyle={{height: 120, backgroundColor: '#FFF'}}
                        placeholderTextColor="#393D42"
                    >
                        <Picker.Item label="-Selecione un país-" value=""/>
                        <Picker.Item label="Estados Unidos" value="US"/>
                        <Picker.Item label="Honduras" value="HN"/>
                        <Picker.Item label="Japón" value="JP"/>
                        <Picker.Item label="Argentina" value="AR"/>
                        <Picker.Item label="Costa Rica" value="CR"/>
                        <Picker.Item label="España" value="ES"/>
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={ animacionEntrada }
                    onPressOut={ animacionSalida }
                    onPress={ consultarClima }
                >
                    <Animated.View 
                        style={[styles.btnBuscar, estiloAnimacion]}
                    >
                        <Text
                            style={styles.btnTextoBuscar}
                        >Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
         </View>
        </>
    )
}
const styles = StyleSheet.create({
    input:{
        color: '#393D42',
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        borderRadius: 12
    },
    btnBuscar:{
        marginTop: 50,
        backgroundColor:'#393D42',
        padding: 10,
        justifyContent: 'center',
        marginHorizontal: '5%',
        borderRadius: 12
    },
    btnTextoBuscar:{
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})
