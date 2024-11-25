import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const App = () => {
  const [arr, setItems] = useState([1, 2, 3, 4]);
  const [isHome, setIsHome] = useState(true);
  const purchaseDate = Date()

  const handlePress = () => {
    if (isHome) {
      setIsHome(false)
      setItems([5,6,7,8])
    } else {
      setIsHome(true)
      setItems([1,2,3,4])
    }
  }

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
          {/* Home Icon */}
          <View style={styles.homeIconWrapper}>
            <MaterialIcons onPress={handlePress} name={ isHome ? "home" : "exercise" } size={24} color="white" />
          </View>
        </View>
      </View>

      {/* ScrollView for containers */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 5 Containers with specific styles */}
        {arr.map((item, index) => (
           <View key={index} style={styles.containerBox}>
           <Text style={styles.containerText}> Workout {item}</Text>
           <Text style={styles.containerText}> Lorem ipsum</Text>
         </View>
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
    backgroundColor: '#E84479', // Background color for circles
  },
  circleText: {
    color: 'white', // White text color for better contrast with pink background
    fontWeight: 'bold',
    fontSize: 22, // Slightly increased font size (from 20 to 22)
  },
  homeIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E84479', // Same background as circles
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  /* ScrollView content styles */
  scrollViewContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Add some space at the bottom of the ScrollView
    alignItems: 'center', // Align the containers horizontally in the center
  },
  /* Container styles */
  containerBox: {
    width: 335, // Fixed width
    height: 210, // Fixed height
    marginBottom: 20, // Space between containers
    borderRadius: 10, // Rounded corners (top left)
    backgroundColor: '#f5f5f5', // Light grey background for each container
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    opacity: 1, // Make the containers visible
    shadowColor: '#000', // Add shadow for smooth effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  containerText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default App;
