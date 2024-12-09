import { Stack } from "expo-router";  // Import Stack for routing
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="workout"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/home')}>
              <View>
                <Feather name="arrow-left" size={20} style={{ color: '#FFFFFF' }} />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <View>
                <Feather name="settings" size={20} style={{ color: '#FFFFFF' }} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}


//const currentEx = dummyExercise["exercises"][4]

const dummyExercise = {
  exercises: [
    {
      video: "",
      workoutName: "Pushups",
      description: "A basic upper-body exercise to strengthen chest and triceps.",
    },
    {
      workoutName: "Squats",
      description: "A lower-body exercise targeting quadriceps and glutes.",
      weights: "",
    },
    {
      workoutName: "Deadlifts",
      description: "A compound movement for overall strength, primarily back and legs.",
      weights: "Barbell or dumbbells",
    },
    {
      workoutName: "Bench Press",
      description: "A chest-focused strength-building exercise.",
      weights: "Barbell or dumbbells",
    },
    {
      workoutName: "Pull-ups",
      description: "An upper-body exercise for back and biceps.",
      weights: "",
    },
    {
      workoutName: "Plank",
      description: "A core stability exercise to build endurance.",
      weights: "",
    },
    {
      workoutName: "Lunges",
      description: "A single-leg exercise for balance and strength in the legs.",
      weights: "Dumbbells (optional)",
    },
    {
      workoutName: "Shoulder Press",
      description: "A shoulder-focused exercise for deltoid strength.",
      weights: "Barbell or dumbbells",
    },
    {
      workoutName: "Bicep Curls",
      description: "An isolation exercise for bicep muscles.",
      weights: "Dumbbells",
    },
    {
      workoutName: "Tricep Dips",
      description: "An exercise for triceps using a bench or parallel bars.",
      weights: "",
    },
  ],
};
const styles = StyleSheet.create({
iconWrapper: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
},
icon: {
  color: 'white',
},
});