import { View, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router'; 
import icons from '../../constants/icons'; // Ensure this path is correct

// TabIcon component to render the icon
const TabIcon = ({ icon }) => {
  return (
    <View>
      <Image
        source={icon} // Pass the specific icon (e.g., icons.home)
        resizeMode="contain"
        style={{ width: 24, height: 24 }} // Adjust size of the icon
      />
    </View>
  );
};


// Layout component with the Tab bar
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle:{
            height: 80,
            justifyContent: 'center',
           
            paddingBottom: 10,
         },
        tabBarShowLabel: false, // Hide label below icons
        headerShown: false,     // Hide the header for each tab screen
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <TabIcon
              icon={icons.home} // Correctly passing the home icon from the icons object
            />
          ),
        }}
      />
      <Tabs.Screen
        name="receta"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <TabIcon
              icon={icons.bookmark} // Correctly passing the bookmark icon
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;