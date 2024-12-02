import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const App = () => {
  const [arr, setItems] = useState([1, 2, 3, 4]);
  const [isHome, setIsHome] = useState(true);

  const handlePress = () => {
    if (isHome) {
      setIsHome(false);
      setItems([5, 6, 7, 8]);  // Update to another set of items for the dumbbell icon
    } else {
      setIsHome(true);
      setItems([1, 2, 3, 4]);  // Reset back to the original set of items
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mirmëngjesi Xhes</Text>
        <View style={styles.headerContent}>
          {/* Horizontal ScrollView */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {/* Circles */}
            {Array.from({ length: 15 }, (_, index) => (
              <View key={index} style={styles.circle}>
                <Text style={styles.circleText}>{index + 1}</Text>
              </View>
            ))}
          </ScrollView>
          {/* Home / Dumbbell Icon */}
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={handlePress}>
              {isHome ? (
                <MaterialIcons name="home" size={30} color="white" />
              ) : (
                <FontAwesome5 name="dumbbell" size={30} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ScrollView for containers */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Containers with specific layout */}
        {arr.map((item, index) => (
          <TouchableOpacity key={index} style={styles.containerBox}  onPress={() => router.push('/home')}>
            {/* Image Section - Removed the image from the container */}
            <Image
              source={{ uri: 'https://via.placeholder.com/337x120' }}
              style={styles.image}
            />
            {/* Text Section */}
            <View style={styles.textSection}>
              {/* Week Title */}
              <Text style={styles.weekText}>Week {item}</Text>
              {/* Workout Title */}
              <Text style={styles.containerText}>Workout {item}</Text>
              {/* Timer Section */}
              <View style={styles.timerSection}>
                <FontAwesome5 name="clock" size={14} color="#999" />
                <Text style={styles.timerText}>30 seconds</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  /* Header styles */
  header: {
    backgroundColor: '#EF87AA',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#E84479',
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E84479',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  /* ScrollView content styles */
  scrollViewContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    flexGrow: 1,
  },
  /* Container styles */
  containerBox: {
    width: '90%',
    maxWidth: 337,
    height: 210,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 120,
  },
  textSection: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  weekText: {
    fontSize: 12,
    color: '#999', // Gray text
    textAlign: 'left', // Aligned to the left
    marginBottom: 5, // Space between Week and Workout
  },
  containerText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timerText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
});

export default App;
