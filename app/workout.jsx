import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 235;
const VISIBLE_COUNT = 4;

const dummyExercise = {
  exercises: [
    { video: 'https://www.w3schools.com/html/mov_bbb.mp4', workoutName: "Pushups", description: "A basic upper-body exercise to strengthen chest and triceps while its utmost difficult for beginers we recomand that you start light at first and build up your streangth." },
    { video: 'https://www.youtube.com/results?search_query=dumbbell+workout', workoutName: "Squats", description: "A lower-body exercise targeting quadriceps and glutes." },
    { video: "https://path/to/video3.mp4", workoutName: "Deadlifts", description: "A compound movement for overall strength, primarily back and legs." },
    { video: "https://path/to/video4.mp4", workoutName: "Bench Press", description: "A chest-focused strength-building exercise." },
    { video: "https://path/to/video5.mp4", workoutName: "Pull-ups", description: "An upper-body exercise for back and biceps." },
    { video: "https://path/to/video6.mp4", workoutName: "Plank", description: "A core stability exercise to build endurance." },
    { video: "https://path/to/video7.mp4", workoutName: "Lunges", description: "A single-leg exercise for balance and strength in the legs." },
    { video: "https://path/to/video8.mp4", workoutName: "Shoulder Press", description: "A shoulder-focused exercise for deltoid strength." },
    { video: "https://path/to/video9.mp4", workoutName: "Bicep Curls", description: "An isolation exercise for bicep muscles." },
    { video: "https://path/to/video10.mp4", workoutName: "Tricep Dips", description: "An exercise for triceps using a bench or parallel bars that tries to make your life much more difficult that it already is so we try our hardest." },
  ],
};

const WorkoutView = () => {
  const [lineWidth, setLineWidth] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(30); // Initial countdown time
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [weights, setWeights] = useState(Array(dummyExercise.exercises.length).fill(''));
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // New state to track description expansion
  const router = useRouter();

  const currentExercise = dummyExercise.exercises[currentExerciseIndex];
  const currentVideoUri = currentExercise.video;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1));
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
    if (isTimerActive) {
      setTimer(30);
    }
  };

  const handleNext = () => {
    setCurrentExerciseIndex((prevIndex) => Math.min(prevIndex + 1, dummyExercise.exercises.length - 1));
    setTimer(30); // Reset timer for the new exercise
  };

  const handleDone = () => {
    if (currentExerciseIndex === dummyExercise.exercises.length - 1) {
      router.push('/home');
    } else {
      setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
      handleNext();
    }
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < dummyExercise.exercises.length -1 ) {
      setCurrentVideoIndex(currentVideoIndex + 1 );
    }else 
    setCurrentVideoIndex(0);
  }

  const visibleExercises = dummyExercise.exercises.slice(currentExerciseIndex, currentExerciseIndex + VISIBLE_COUNT);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Video
          source={{ uri: currentVideoUri }}
          style={styles.video}
          controls
          resizeMode="cover"
        />
        
        <View style={styles.exerciseNameContainer}>
          <Text style={styles.exerciseTitle}>{currentExercise.workoutName}</Text>
        </View>

        <View style={styles.timerContainer}>
          <TouchableOpacity onPress={toggleTimer} style={styles.timerTouchable}>
            <FontAwesome5
              name="stopwatch"
              size={18}
              color={isTimerActive ? '#FF69B4' : '#9CA3AF'}
            />
            <Text style={[styles.timerText, { color: isTimerActive ? '#FF69B4' : '#9CA3AF' }]}>
              {timer} sec
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {isDescriptionExpanded
              ? currentExercise.description
              : currentExercise.description.length > 100
              ? `${currentExercise.description.substring(0, 100)}...`
              : currentExercise.description}
          </Text>
          {currentExercise.description.length > 15 && (
            <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
              <Text style={styles.readMoreText}>{isDescriptionExpanded ? 'See less' : 'See more'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.highlightContainer}>
          <Text 
            style={styles.boldHighlightedText} // Bold version
            onLayout={(event) => setLineWidth(event.nativeEvent.layout.width)}
          >
            Ushtrimet e dites
          </Text>
          <View style={[styles.highlightedLine, { width: lineWidth }]} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {visibleExercises.map((exercise, index) => (
            <View key={index} style={[styles.scrollItem, index === 0 ? styles.highlighted : null]}>
              {index === 0 && (
                <TouchableOpacity style={styles.playIcon} onPress={toggleTimer}>
                  <FontAwesome5
                    name={isTimerActive ? 'pause' : 'play'}
                    size={12}
                    color={isTimerActive ? '#FF69B4' : '#4B5563'}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.scrollText}>{exercise.workoutName}</Text>
              </View>
              <TextInput
                style={[
                  styles.weightInput,
                  focusedInputIndex === index 
                ]}
                placeholder="Weight"
                keyboardType="numeric"
                value={weights[index]}
                onFocus={() => setFocusedInputIndex(index)}
                onBlur={() => setFocusedInputIndex(null)}
                onChangeText={(text) => {
                  const updatedWeights = [...weights];
                  updatedWeights[index] = text;
                  setWeights(updatedWeights);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.buttonContainer, styles.nextButtonContainer]}>
        <TouchableOpacity style={styles.nextButton} onPress={() =>{ goToNextVideo(); handleDone();}}>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    position: 'relative',
  },
  video: {
    width: width - 32,
    height: IMG_HEIGHT,
    borderRadius: 16,
  },
  exerciseNameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    justifyContent: 'flex-start',
  },
  timerText: {
    fontSize: 16,
    marginLeft: 4,
  },
  descriptionContainer: {
    marginVertical: 16,
    width: '100%',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
  },
  readMoreText: {
    color: '#FF69B4',
    fontSize: 14,
  },
  highlightContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
    width: '100%',
  },
  boldHighlightedText: {
    fontSize: 20,
    fontWeight: 'bold', // Make the text bold
    color: '#9CA3AF',
    marginBottom: 4,
  },
  highlightedLine: {
    height: 2,
    backgroundColor: '#FF69B4',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    height: 55,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  highlighted: {
    backgroundColor: 'rgb(222, 223, 228)',
  },
  scrollText: {
    fontSize: 16,
    color: '#6B7280',
  },
  playIcon: {
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  weightInput: {
    width: 70,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  unfocusedInput: {
    backgroundColor: '#FFF',
    color: '#6B7280',
  },
  focusedInput: {
    backgroundColor: '#D1D5DB',
    color: '#FFF',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#FF69B4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  nextButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default WorkoutView;
