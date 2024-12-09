import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, VirtualizedList, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 235;

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

const WorkoutView = () => {
  const [lineWidth, setLineWidth] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(30); // Initial countdown time
  const [inputText, setInputText] = useState('');
  const [repsData, setRepsData] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const router = useRouter();

  // Current exercise
  const currentExercise = dummyExercise.exercises[currentExerciseIndex];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
    if (!isTimerActive) {
      setTimer(30); // Reset the timer when starting
    }
  };

  const handleAddReps = () => {
    if (inputText.trim() !== '') {
      setRepsData([...repsData, inputText.trim()]);
      setInputText(''); // Clear the input
    }
  };

  const handleNext = () => {
    setRepsData([]); // Clear the list on moving to the next exercise
    setInputText(''); // Clear the input field
    setCurrentExerciseIndex((prevIndex) => Math.min(prevIndex + 1, dummyExercise.exercises.length - 1));
  };

  const handleDone = () => {
    if (currentExerciseIndex === dummyExercise.exercises.length - 1) {
      // If the user is on the last exercise, navigate to the home screen
      router.push('/home');
    } else {
      handleNext(); // Otherwise, move to the next exercise
    }
  };

  const renderReps = ({ item }) => (
    <Text style={styles.repsItem}>{item}</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Video Header */}
        <Image
          source={require('../assets/images/Frame 60 (1).png')} // Replace with your video URL
          style={styles.video}
          resizeMode="cover"
        />

        {/* Exercise Name */}
        <Text style={styles.exerciseTitle}>{currentExercise.workoutName}</Text>

        {/* Timer */}
        <TouchableOpacity style={styles.timerContainer} onPress={toggleTimer}>
          <FontAwesome5
            name="stopwatch"
            size={18}
            color={isTimerActive ? '#FF69B4' : '#9CA3AF'}
          />
          <Text style={[styles.timerText, { color: isTimerActive ? '#FF69B4' : '#9CA3AF' }]}>
            {timer} sec
          </Text>
        </TouchableOpacity>

        {/* Exercise Description */}
        <Text style={styles.description}>{currentExercise.description}</Text>

        {/* Highlighted Text */}
        <View style={styles.highlightedTextContainer}>
          <Text
            style={styles.highlightedText}
            onLayout={(event) => setLineWidth(event.nativeEvent.layout.width)}
          >
            Ushtrimet e dites
          </Text>
          <View style={[styles.highlightedLine, { width: lineWidth }]} />
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          {/* Introduction Tab */}
          <View style={styles.tabContainer}>
            <Text style={styles.tabTextHighlighted}>Introduction</Text>
            <Text style={styles.tabContent}>First steps</Text>
            <Text style={styles.tabContent}>Mental preparation</Text>
            <Text style={styles.tabContent}>Tactic</Text>
          </View>

          {/* Pesha Tab */}
          <View style={styles.tabContainer}>
            <Text style={styles.tabTextHighlighted}>Pesha</Text>
            <Text style={styles.tabContent}>{currentExercise.weights || 'Not specified'}</Text>

            {/* Text Input for Reps */}
            <TextInput
              style={styles.input}
              placeholder="E.g., 15 reps with 15 kg"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddReps}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {/* Display Reps */}
            <VirtualizedList
              data={repsData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderReps}
              getItemCount={(data) => data.length}
              getItem={(data, index) => data[index]}
              style={styles.repsList}
            />
          </View>
        </View>

        {/* Next or Done Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleDone}>
          <Text style={styles.nextButtonText}>
            {currentExerciseIndex === dummyExercise.exercises.length - 1 ? 'Done' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  video: {
    width: width,
    height: IMG_HEIGHT,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 29.05,
    textAlign: 'left',
    marginVertical: 20,
    alignSelf: 'flex-start',
    width: '90%',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '90%',
  },
  timerText: {
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    color: '#666',
    marginVertical: 10,
    alignSelf: 'flex-start',
    width: '90%',
  },
  highlightedTextContainer: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    alignItems: 'center',
  },
  highlightedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  highlightedLine: {
    height: 2,
    backgroundColor: '#FF69B4',
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  tabContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '48%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tabTextHighlighted: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  tabContent: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  repsList: {
    width: '100%',
  },
  repsItem: {
    marginTop: 5,
    color: '#333',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WorkoutView;
