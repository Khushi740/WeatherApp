import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome icons
import SearchBar from './SearchBar';

export default function Weather({ weatherData, fetchWeatherData }) {
  const {
    weather,
    name,
    sys: { country },
    main: { temp, humidity,temp_max,temp_min ,pressure},
    wind: { speed },
    // weather:{description}
  } = weatherData;
  const [{ main ,description}] = weather;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='darkgray' />
      <View style={styles.subContainer}>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ ...styles.headerText, fontWeight: 'bold', fontSize: 40 }}>City:{name}</Text>
          <Text style={{ ...styles.headerText, fontWeight: 'bold', fontSize: 40 }}>Country:{country}</Text>
          <Text style={{ ...styles.headerText, fontWeight: 'bold' }}>{main}</Text>
          <Text style={{fontSize: 18,fontWeight:'500'}}>Dis:{description}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headerText}>{temp} °C</Text>
          <FontAwesome name="thermometer" size={28} color="#9B6CE8" style={{ marginLeft: 16,marginTop:11 }} />
          </View>
          <View  style={{  alignItems: 'center' }}>
          <Text style={{fontSize:20,fontWeight:'500'}}>Pressure:{pressure} hPa</Text>
            </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <FontAwesome name="tint" size={28} color="#9B6CE8" style={{ marginBottom: 5 }} />
            <Text style={{ fontSize: 22, color: 'white', marginBottom: 5 }}>Humidity</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
          </View>
          <View style={styles.info}>
            <FontAwesome5 name="wind" size={28} color="#9B6CE8" style={{ marginBottom: 5 }} />
            <Text style={{ fontSize: 22, color: 'white', marginBottom: 5 }}>Wind Speed</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B6CE8',
    alignItems: 'center',
    opacity: 0.7,
  },
  subContainer: {
    backgroundColor: 'white',
    margin: 50,
    marginHorizontal: 40,
    flex: 1,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
    textAlign: 'center',
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    alignItems: 'center',
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
});