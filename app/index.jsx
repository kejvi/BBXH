import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Correct import for Expo

const Login = () => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/images/Rectangle 23.png')} // Ensure the image path is correct
        style={styles.backgroundImage}
        resizeMode="cover" // Ensure the image covers the entire screen
      />

      {/* Linear Gradient Overlay */}
      <LinearGradient
        colors={['transparent', '#060A11']} // Transparent at the top, dark color for search bars and button
        locations={[0, 0.6]} // The gradient starts transparent and then turns dark at around 60% of the height
        style={styles.gradient}
        start={{ x: 0, y: 0 }} // Gradient starts at the top
        end={{ x: 0, y: 1 }} // Gradient ends at the bottom
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo */}
        <Text style={styles.logo}>Bodies By Xhes</Text>

        {/* Input fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#9CA3AF"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={() => { /* Add login functionality here */ }}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,               // Ensures the container fills the screen
    width: '100%',         // Full width of the container
    height: '100%',        // Full height of the container
  },
  backgroundImage: {
    width: '100%',         // Make sure the image takes up full width
    height: '100%',        // Make sure the image takes up full height
    position: 'absolute',  // Position the image behind everything
    top: 0,
    left: 0,
    zIndex: -1,            // Ensures the image is behind all other components
  },
  gradient: {
    position: 'absolute',  // Make sure the gradient is on top of the image
    bottom: 0,             // Apply gradient only to the bottom
    left: 0,
    width: '100%',
    height: '50%',         // Gradient covers the bottom 50% of the screen (adjust if needed)
    zIndex: 1,             // Ensure gradient is above the image but below the content
  },
  content: {
    flex: 1,                // Makes the content take up available space
    justifyContent: 'flex-end',  // Align content at the bottom of the screen (for input and button)
    width: '100%',          // Full width
    paddingBottom: 20,      // Adds space at the bottom of the screen
    alignItems: 'center',   // Center content horizontally
    zIndex: 2,              // Ensures the content stays on top of the gradient and image
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',   // Position logo absolutely within the container
    top: '40%',             // Position it around the middle of the screen
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginTop: 24,            // Space between the logo and inputs
    alignItems: 'center',     // Center the inputs horizontally
  },
  input: {
    width: 327,              // Fixed width for inputs
    height: 44,              // Fixed height for inputs
    backgroundColor: '#EEF2F5', // Light background color for input fields
    paddingLeft: 12,         // Padding inside input fields
    marginBottom: 12,        // Space between input fields
    borderRadius: 8,         // Rounded corners for input fields
    fontSize: 14,
    color: '#9CA3AF',        // Text color inside input fields
  },
  loginButton: {
    width: 327,              // Fixed width for the button
    height: 43,              // Fixed height for the button
    backgroundColor: '#E84479', // Button color
    justifyContent: 'center', // Center the button text
    alignItems: 'center',    // Center the button horizontally
    borderRadius: 8,         // Rounded corners for the button
    marginTop: 10,           // Space between inputs and the button (reduced to lift the button)
  },
  loginButtonText: {
    color: '#fff',           // White text on the button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
