import { View, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router'; 
import icons from '../../constants/icons'; // Ensure this path is correct

const TabIcon = ({ icon }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 80,
          justifyContent: 'center',  // Center content vertically
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => <TabIcon icon={icons.home} />,
        }}
      />
      <Tabs.Screen
        name="receta"
        options={{
          tabBarIcon: () => <TabIcon icon={icons.bookmark} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
