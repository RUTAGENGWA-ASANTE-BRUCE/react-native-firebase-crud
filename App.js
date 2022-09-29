import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {NavigationContainer} from "@react-navigation/native"
import HomeScreen from "./src/screens/HomeScreen"
export default function App() {
  const Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
    <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen component={HomeScreen} name="HomeScreen" options={{headerShown:false}}/>
        </Stack.Navigator>
    </SafeAreaProvider>
      </NavigationContainer>
  );
}

