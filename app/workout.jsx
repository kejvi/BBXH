import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 235;

const WorkoutView = () => {
  const [lineWidth, setLineWidth] = useState(0);
  const router = useRouter();

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {/* Video Header */}
          <Image
            source={require('../assets/images/Frame 60 (1).png')} // Replace with your video URL
            style={styles.video}
            resizeMode="cover"
            isLooping
            shouldPlay
          />

          {/* Exercise Name */}
          <Text style={styles.exerciseTitle}>Push Ups</Text>

          {/* Timer */}
          <View style={styles.timerContainer}>
            <FontAwesome5 name="stopwatch" size={18} color="#9CA3AF" />
            <Text style={styles.timerText}>30 sec</Text>
          </View>

          {/* Exercise Description */}
          <Text style={styles.description}>
            This exercise strengthens your upper body, targeting chest, shoulders, and triceps.
          </Text>

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
              <Text style={styles.tabContent}>14 kg</Text>
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
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
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  video: {
    width: width,
    height: IMG_HEIGHT,
  },
  exerciseTitle: {
    fontFamily: 'Inter', // Use Inter font
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 29.05,
    letterSpacing: -0.02,
    textAlign: 'left',
    marginVertical: 20,
    alignSelf: 'flex-start',
    width: '90%',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '90%',
  },
  timerText: {
    fontFamily: 'Satoshi', // Use Satoshi font
    fontSize: 16,
    marginLeft: 5,
    color: '#9CA3AF',
  },
  description: {
    fontFamily: 'Satoshi', // Use Satoshi font
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
    fontFamily: 'Inter', // Use Inter font
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
    marginBottom: 40, // Increase space between tabs and next button
  },
  tabContainer: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '48%',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,  // Give more space to tabs
  },
  tabTextHighlighted: {
    fontFamily: 'Inter', // Use Inter font
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
    fontFamily: 'Satoshi', // Use Satoshi font
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40, // Lower the button by adding margin
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
