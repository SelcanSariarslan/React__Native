import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import DetialsScrean from './screans/DetailsScreen';
import HomeScrean from './screans/HomeScreen';
import SettingScrean from './screans/SettingSecreen';
import Map from '../src/component/Map';
import Araçlar from '../src/component/Araçlar';
import Manager from '../src/managerComponent/manager';

// Screen names
const homeName = 'My Vehicle';
const MapName = 'Map';

const Tab = createBottomTabNavigator();

export default function MainContianer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'car' : 'car-outline';
            } else if (rn === MapName) {
              iconName = focused ? 'map' : 'map-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 15 },
          style: { padding: 10, height: 90, backgroundColor: 'red' },
        }}
      >
        <Tab.Screen name={homeName} component={Manager} options={{ headerShown: false }} />
        <Tab.Screen name={MapName} component={Map} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
