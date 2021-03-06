import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'



export const Clima = ({ guardarResultado }) => {

    const { name, main } = guardarResultado

    if (!name) return null;

    const kelvin = 273.15

    return (
        <View style={styles.clima}>
            <Text style={[styles.texto, styles.actual]}>
                {parseInt(main.temp - kelvin)}
                <Text style={styles.temperatura}>
                    &#x2103; {' '}
                </Text>
                <Image
                    style={{ width: 66, height: 58 }}
                    source={{ uri: `http://openweathermap.org/img/w/${guardarResultado.weather[0].icon}.png` }}
                />
            </Text>
            <View style={styles.temperaturas}>
                <Text style={styles.texto}>Min{' '}
                    <Text style={styles.temperatura}>
                        {parseInt(main.temp_min - kelvin)} &#x2103;
                    </Text>
                </Text>

                <Text style={styles.texto}>Max{' '}
                    <Text style={styles.temperatura}>
                        {parseInt(main.temp_max - kelvin)} &#x2103;
                    </Text>
                </Text>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    clima: {
        marginBottom: 20
    },
    texto: {
        color: '#F5F5F5',
        fontSize: 22,
        textAlign: 'center',
        marginRight: 20

    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temperatura: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    temperaturas: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})