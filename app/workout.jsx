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
import axios from 'axios';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 235;
const VISIBLE_COUNT = 4;

const WorkoutView = () => {
  const {id}  = useLocalSearchParams()

  const [lineWidth, setLineWidth] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(30); // Initial countdown time
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [weights, setWeights] = useState([]);
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // New state to track description expansion
  const [workoutData, setWorkoutData] = useState(null); // State to store fetched workout data
  const [exercises, setExercises] = useState([]); // State to store exercises fetched from API
  const router = useRouter();

// console.log("Workout id",router.params)

  const fetchWorkoutData = async () => {
    const options = {
      method: 'GET',
      url: `https://stoplight.io/mocks/gym-app-ira/bodie-by-xhess/674100124/user/workouts/${id}`,
      headers: { Accept: 'application/json', Authorization: 'Bearer 123' },
    };

    try {
      const { data } = await axios.request(options);
      setWorkoutData(data.workout);
      setExercises(data.exercises);
      setWeights(Array(data.exercises.length).fill('')); // Initialize weights with an empty array of the same length as exercises
    } catch (error) {
      console.error('Error fetching workout data:', error);
    }
  };

  useEffect(() => {
    fetchWorkoutData();
  }, []);

  const currentExercise = exercises[currentExerciseIndex] || {};
  const currentVideoUri = currentExercise.exercise?.videoUrl || '';
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
    setCurrentExerciseIndex((prevIndex) => Math.min(prevIndex + 1, exercises.length - 1));
    setTimer(30); // Reset timer for the new exercise
  };

  const handleDone = () => {
    if (currentExerciseIndex === exercises.length - 1) {
      router.push('/home');
    } else {
      setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
      handleNext();
    }
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < exercises.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
  };

  const visibleExercises = exercises.slice(currentExerciseIndex, currentExerciseIndex + VISIBLE_COUNT);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {currentVideoUri && (
          <Video
            source={{ uri: currentVideoUri }}
            style={styles.video}
            controls
            resizeMode="cover"
          />
        )}
{/* 
        <View style={styles.exerciseNameContainer}>
          <Text style={styles.exerciseTitle}>{currentExercise.exercise?.name}</Text>
        </View> */}

        <View style={styles.timerContainer}>
        <Text style={styles.exerciseTitle}>{currentExercise.exercise?.name}</Text>
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
          <Text style={styles.description}>
            {isDescriptionExpanded
              ? currentExercise.exercise?.description
              : currentExercise.exercise?.description?.length > 100
              ? `${currentExercise.exercise?.description.substring(0, 100)}...`
              : currentExercise.exercise?.description}
          </Text>
          {currentExercise.exercise?.description?.length > 15 && (
            <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
              <Text style={styles.readMoreText}>{isDescriptionExpanded ? 'See less' : 'See more'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {isDescriptionExpanded
              ? currentExercise.exercise?.description
              : currentExercise.exercise?.description?.length > 100
              ? `${currentExercise.exercise?.description.substring(0, 100)}...`
              : currentExercise.exercise?.description}
          </Text>
          {currentExercise.exercise?.description?.length > 15 && (
            <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
              <Text style={styles.readMoreText}>{isDescriptionExpanded ? 'See less' : 'See more'}</Text>
            </TouchableOpacity>
          )}
        </View> */}

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
                <Text style={styles.scrollText}>{exercise.exercise?.name}</Text>
              </View>
              <TextInput
                style={[
                  styles.weightInput,
                  focusedInputIndex === index ? styles.focusedInput : styles.unfocusedInput,
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
        <TouchableOpacity style={styles.nextButton} onPress={() => { goToNextVideo(); handleDone(); }}>
          <Text style={styles.nextButtonText}>
            {currentExerciseIndex === exercises.length - 1 ? 'Done' : 'Next'}
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
  },
  timerTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 8,
    marginLeft:25,
    justifyContent: 'space-between',
    gap: 5,
  },
  timerText: {
    fontSize: 16,
    marginLeft: 8,
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
    marginLeft: 7,
  },
  boldHighlightedText: {
    fontSize: 20,
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
    marginLeft:5,
    marginRight:5,
  },
  highlighted: {
    backgroundColor: 'rgb(222, 223, 228)',
  },
  scrollText: {
    fontSize: 16,
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
    
    color: '#6B7280',
  },
  focusedInput: {
    backgroundColor: '#D1D5DB',
    
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
    marginBottom: 30,
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
