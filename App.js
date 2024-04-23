import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import * as Location from 'expo-location';

const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    fetchWeatherData('Mumbai');
  }, []);

  const fetchWeatherData = async (cityName) => {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeatherByLocation = async () => {
    setLoaded(false);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
      const response = await fetch(API);
      const data = await response.json();
      setWeatherData(data);
      setLoaded(true);
    } catch (error) {
      console.log('Error fetching location:', error);
    }
  };

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='gray' size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.button} onPress={fetchWeatherByLocation}>
          <Text style={styles.buttonText}>📍 Get Weather for Current Location</Text>
        </TouchableOpacity>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
        
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherByLocation}>
        <Text style={styles.buttonText}>📍 Get Weather for Current Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28,
  },
  button: {
    backgroundColor: 'rgb(232, 217, 252)',
    padding: 10,
    borderRadius: 5,
    top:5,
    right:2,
    borderRadius:30,
    position:'absolute'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});