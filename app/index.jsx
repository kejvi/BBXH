import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import BASE_URL from '../api/baseUrl.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Track loading state
  const [errorMessage, setErrorMessage] = useState(null);  // Store error message

  // Function to handle login logic
  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);  // Start loading
      try {
        // Prepare data for POST request
        const response = await fetch(`${BASE_URL}/auth/login`, { // Update with your login endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

       // const data = await response.json();

        if (response.ok) {
          console.log("API HITTED")
          // Assuming the response contains a token or some other data to store
          await AsyncStorage.setItem('userEmail', email);
          // You can store other data like a token as well if needed
          // await AsyncStorage.setItem('authToken', data.token); 

          // Redirect to home page
          router.push('/home');
        } else {

          // Handle API errors (e.g., wrong credentials)
          setErrorMessage("Login failed. Please try again.");
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setIsLoading(false);  // End loading
      }
    } else {
      setErrorMessage('Email and password are required.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Rectangle 23.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', '#060A11']}
        locations={[0, 0.6]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.content}>
        <Text style={styles.logo}>Bodies By Xhes</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail} // Store the input in state
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Store the password in state
          />
        </View>
        
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}  {/* Display error message */}
        
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}  // Disable button while loading
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        { <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity> }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    top: '40%',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  input: {
    width: 327, // Consistent width for alignment
    height: 44,
    backgroundColor: '#EEF2F5',
    paddingHorizontal: 12, // Adds horizontal padding for better alignment
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#000', // Updated for better contrast
    alignSelf: 'center', // Ensures alignment in the center of the screen
  },
  loginButton: {
    width: 327,
    height: 43,
    backgroundColor: '#E84479',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#E84479', // Same color as the button
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Login;
