import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {Redirect, router} from 'expo-router';
const WorkoutView = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Dummy Picture */}
      <Image source={require('../assets/images/Frame 60.png')} style={styles.image} />

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
        <Text style={styles.highlightedText}>Ushtrimet e dites</Text>
      </View>

      {/* Tabs Section (Side by Side) */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Ensure space for the Next button
    alignItems: 'center', // Center all content horizontally
  },
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  exerciseTitle: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 29.05,
    letterSpacing: -0.02,
    textAlign: 'left', // Align text to the left
    marginVertical: 20,  // Increased margin to create more space between the image and the text
    width: '80%', // Limit width to 80% of screen for a more left-aligned appearance
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start', // Align icon and text to the left
    width: '80%', // Limit width to 80% of screen
  },
  timerText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#9CA3AF',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
  },
  highlightedTextContainer: {
    alignSelf: 'flex-start',
    marginVertical: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
  },
  highlightedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  tabContainer: {
    paddingVertical: 18,
    paddingHorizontal: 45,
    width: '48%',
    alignItems: 'center',
    borderRadius: 10,
  },
  tabTextHighlighted: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    paddingHorizontal: 35,
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
  nextButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
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
