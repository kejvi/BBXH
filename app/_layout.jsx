// _layout.jsx
import { Slot, Stack } from "expo-router";  // Import Slot for routing
import { View, StyleSheet } from "react-native";


export default function RootLayout() {
  return(
    <Stack>
       <Stack.Screen name="index" options={{headerShown: false}}  />

     <Stack.Screen
       name="(tabs)"  options={{headerShown: false}}
      />
 
    </Stack>
  )
}