import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
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
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/home')}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#060A11', // Ensures background color in safe areas
  },
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
});

export default Login;
